import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {

    app.put("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;

        try {
            const updatedModule = modulesDao.updateModule(moduleId, moduleUpdates);
            res.status(200).json(updatedModule);
        } catch (error) {
            console.error(`Error updating module: ${error.message}`);
            res.status(404).json({ error: error.message });
        }
    });
    app.delete("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        modulesDao.deleteModule(moduleId);
        res.sendStatus(204);
    });
}