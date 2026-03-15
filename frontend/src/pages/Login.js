export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white pt-24">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Вход</h2>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold">
            Войти
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Нет аккаунта?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
}
