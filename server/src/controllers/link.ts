/*
 * LINK 
 * create new link
 * update link
 * delete link
 * // need numbering or not??
 */

import { LinkSchema, type Link} from "shared";
import type { ApiResponse, ApiError } from "shared";
import { apiSuccess, apiError, jsonResponse } from "../utils/apiResponse";
import { AppError } from "../utils/CustomError";
import { isValidUserId, createLink, getLink, updateLinkById, isLinkOwnedByUser, deleteLinkById } from "../db/queries/link";
import { ZodError } from 'zod';


export async function create_link(req: Request): Promise<Response> {
    try{
        const body = req.get("body");
        const parsed = LinkSchema.safeParse(body);

        if (!parsed.success) {
            const issues = parsed.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            return jsonResponse(
                apiError("Invalid input", 400, { issues }),
                400
            );
        }
        const userId = "lsf"; //TODO:  
        const { title, url, tags } = parsed.data;

        const isValid = await isValidUserId(userId) 
        if (!isValid) {
            return jsonResponse(apiError("Invalid user", 401), 401);
        }

        const new_link = await createLink(title, url, tags, userId) 

        return jsonResponse(
            apiSuccess(
                { new_link },
                "link created!"
            ),
            201
        );

    }catch(err){
        console.error("creating link error: ", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}


export async function get_link(req: Request): Promise<Response> {

    try{
        //TODO: get userid
        const userIdParam = req.query("userId"); // adjust if using route params or auth

        if (!userIdParam || isNaN(Number(userIdParam))) {
            return jsonResponse(apiError("Invalid user ID", 400), 400);
        }
        const userId = Number(userIdParam);

        const isValid = await isValidUserId(userId) 
        if (!isValid) {
            return jsonResponse(apiError("Invalid user", 401), 401);
        }
        const links = await getLink(userId);

        return jsonResponse(
            apiSuccess({ links }, "User links fetched successfully."),
            200
        );

    }catch(err){
        console.error("fetching link error: ", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}

export async function update_link(req: Requeset): Promise<Response> {
    try {
        const body = req.get("body");

        const { id, title, url, tag, userId } = body;

        if (!id || isNaN(Number(id)) || !userId || isNaN(Number(userId))) {
            return jsonResponse(apiError("Invalid input", 400), 400);
        }

        const linkId = Number(id);

        const isValid = await isValidUserId(userId) 
        if (!isValid) {
            return jsonResponse(apiError("Invalid user", 401), 401);
        }
        const ownsLink = await isLinkOwnedByUser(linkId, userId);
        if (!ownsLink) {
            return jsonResponse(apiError("Unauthorized access", 403), 403);
        }

        const updated = await updateLinkById(linkId, { title, url, tag });
        return jsonResponse(apiSuccess({ updated }, "Link updated successfully."), 200);

    } catch (err) {
        console.error("Error updating link:", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}

export async function delete_link(req: Requeset): Promise<Response> {
    try {
        const linkIdParam = req.query("id");
        const userIdParam = req.query("userId");

        if (!linkIdParam || !userIdParam) {
            return jsonResponse(apiError("Missing link ID or user ID", 400), 400);
        }

        const linkId = Number(linkIdParam);
        //TODO: check link is valid or not 
        const userId = Number(userIdParam);

        const isValid = await isValidUserId(userId) 
        if (!isValid) {
            return jsonResponse(apiError("Invalid user", 401), 401);
        }

        const ownsLink = await isLinkOwnedByUser(linkId, userId);
        if (!ownsLink) {
            return jsonResponse(apiError("Unauthorized access", 403), 403);
        }

        await deleteLinkById(linkId);
        return jsonResponse(apiSuccess({}, "Link deleted successfully."), 200);

    } catch (err) {
        console.error("Error deleting link:", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}
