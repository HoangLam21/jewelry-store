export const fetchSchedule = async ()=>{
    try{   
        const schedules = await fetch("/api/schedule/all");
        return await schedules.json();
    }catch(error){
        console.log(error);
        throw error;
    }
}