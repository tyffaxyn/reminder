const AuthLayout = ({ children }: any) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  )
}

export default AuthLayout
