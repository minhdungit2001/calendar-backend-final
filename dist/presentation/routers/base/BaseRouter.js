"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initBaseController(router, controller) {
    router.get("/", controller.getAllAsync);
    router.post("/", controller.createAsync);
    //! For development
    router.delete("/all", controller.deleteAllAsync);
    router.put("/:id", controller.updateAsync);
    router.get("/:id", controller.findByIdAsync);
    router.delete("/:id", controller.deleteOneAsync);
    return router;
}
exports.default = initBaseController;
//# sourceMappingURL=BaseRouter.js.map