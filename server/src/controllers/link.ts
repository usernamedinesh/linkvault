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
import { Context, Request } from "hono";


export async function create_link(c: Context): Promise<Response> {
    try{
        const body = await c.req.json();
        const parsed = LinkSchema.safeParse(body);
        const userId = c.get("userId");

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

    } catch(err){
        console.error("creating link error: ", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}


export async function get_link(c: Context): Promise<Response> {

    try{
        const userIdParam = await c.get("userId");
        if (!userIdParam || isNaN(Number(userIdParam))) {
            return jsonResponse(apiError("Invalid user ID", 400), 400);
        }
        const userId = Number(userIdParam);

        const isValid = await isValidUserId(userId) 
        if (!isValid) {
            return jsonResponse(apiError("Invalid user", 401), 401);
        }
        const links = await getLink(userId);
        if (!links || links.length === 0) {
            return jsonResponse(
                apiSuccess({}, "No User links found."),
                200
            );
        }

        return jsonResponse(
            apiSuccess({ links }, "User links fetched successfully."),
            200
        );

    } catch(err){
        console.error("fetching link error: ", err);
        return jsonResponse(apiError("Internal server error", 500), 500);
    }
}

export async function update_link(c: Context): Promise<Response> {
    try {

        const body = await c.req.json();
        const userId = Number(c.get("userId"));

        const { id, title, url, tag} = body;

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

export async function delete_link(c: Context): Promise<Response> {
    try {
        const body = await c.req.json();
        const { linkIds } = body;
        const userIdParam = c.get("userId");

        if (!linkIds || !userIdParam) {
            return jsonResponse(apiError("Missing link ID or user ID", 400), 400);
        }

        const linkId = Number(linkIds);
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
