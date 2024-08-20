import { LuLock } from 'react-icons/lu';
import Input from '~/UI/Input';

function AuthForm() {
  return (
    <form
      method="post"
      className="animate-fade-slide-up mx-auto mt-24 w-[36rem] rounded-xl bg-indigo-500 px-12 py-6 text-center text-lg shadow-lg"
      id="auth-form"
    >
      <div className="animate-fade-slide-up mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-full border-4">
        <LuLock className="p size-8 stroke-[3] text-gray-50" />
      </div>
      <p className="my-6">
        <label htmlFor="email" className="text-gray-50">
          Email Address
        </label>
        <Input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password" className="text-gray-50">
          Password
        </label>
        <Input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="my-6 flex flex-col">
        <button className="mx-auto w-max rounded-full bg-amber-500 px-6 py-1 text-xl font-semibold text-indigo-800">
          Login
        </button>
        <a className="my-2 text-center text-sm text-indigo-50" href="/auth">
          Log in with existing user
        </a>
      </div>
    </form>
  );
}

export default AuthForm;
