export function isTokenValid(token: string | null ): boolean {
    try{
        if (!token) return false;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now(); // check expiry
    }catch(err){
        return false;
    }
}
