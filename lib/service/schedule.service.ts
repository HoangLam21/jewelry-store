export const fetchSchedule = async () => {
  try {
    const response = await fetch(`/api/schedule/all`);
    return await response.json();
  } catch (error) {
    console.log("Error when fetch Schedule: ", error);
  }
};
