export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  endpoints: {
    video: "http://127.0.0.1:8000/ml_app/api/analyze/",
    audio: "http://127.0.0.1:8000/ml_app/api/analyze-audio/",
    image: "http://127.0.0.1:8000/ml_app/api/analyze-image/",
  },
};
