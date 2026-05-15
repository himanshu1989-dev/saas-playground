import { analyzeDishController } from "../analyzeDishController/analyzeDishController.js";
export function dishRoute(req,res){
    if (req.method === "GET" && req.url === "/api/analyzeDish")
    {
        analyzeDishController(req,res);
        return true;
    }
    return false;
}