import {API_URL} from "@/app/constants/constants";
import {handleError} from "@/axios/handleFailure";
import {useAuthState} from "@/app/login/auth/useAuthState";
import axios from "axios";

export const apiPatch = async ({endPoint, body, onSuccess, onFail, overwriteDefaultOnFail = true, isRetry = false}:
   {
       endPoint: string,
       body?: object,
       onSuccess?: (value: any) => void,
       onFail?: (error?: any) => void,
       overwriteDefaultOnFail?: boolean,
       isRetry?: boolean,
   }) => {

    console.log("PATCH 요청 전송: " + API_URL + endPoint);
    console.log("body: ", body);

    const token = useAuthState.getState().accessToken;
    const headers = token ? {Authorization: token} : {};

    try {
        // 요청 전송
        const response: any = await axios.patch(API_URL + endPoint, body, {headers});

        // 성공
        console.log("PATCH 요청 성공: ", response);
        onSuccess?.(response);

        return response; // 응답 리턴

    } catch (error: any) { // 요청 실패(에러)
        handleError({
            isRetry: isRetry,
            error: error,
            overwriteDefaultOnFail: overwriteDefaultOnFail,
            onFail: onFail,
            originalRequest: {
                method: "PATCH",
                endPoint: endPoint,
                body: body,
                onSuccess: onSuccess,
                overwriteDefaultOnFail: overwriteDefaultOnFail,
                onFail: onFail,
            }
        });
        return null;
    }
}