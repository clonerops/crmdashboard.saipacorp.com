import { http } from "../../../../_cloner/helpers/axiosConfig";

const loginUser = async (userData: any) => {
    try {
        const { data } = await http.post("/Users/authenticate", JSON.stringify(userData));
        return data
    
    } catch (error: any) {
        return error.response;        
    }
};

const getCaptcha = async () => {
    const { data } = await http.get("/Users/GetCaptcha");
    return data;
};

export { loginUser, getCaptcha };
