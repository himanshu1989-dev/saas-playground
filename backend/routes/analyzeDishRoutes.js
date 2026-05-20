import { analyzeDishController } from "../controllers/analyzeDishController.js";
export function dishRoute(req,res){
    if (req.method === "POST" && req.url === "/api/analyzeDish")
    {
        analyzeDishController(req,res);
        return true;
    }
    return false;
}