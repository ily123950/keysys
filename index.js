// Настройки
const BACKEND_URL = "https://key-system-eme7.onrender.com";
const API_SECRET = "vernamontop"; // Замени на свой!

// Обработчик запросов
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Разрешаем только нужные пути
    if (path === '/getkey' || path === '/verify') {
      const backendUrl = `${BACKEND_URL}${path}${url.search}`;
      
      // Клонируем заголовки
      const headers = new Headers(request.headers);
      headers.set('X-API-Secret', API_SECRET); // Добавляем секретный ключ

      try {
        const response = await fetch(backendUrl, {
          method: request.method,
          headers: headers
        });

        // Возвращаем ответ с CORS для Roblox
        return new Response(response.body, {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          success: false, 
          message: "Backend error" 
        }), { status: 502 });
      }
    }

    // Блокируем другие пути
    return new Response(JSON.stringify({ 
      success: false, 
      message: "Use /getkey or /verify" 
    }), { status: 404 });
  }
};
