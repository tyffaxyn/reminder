import Nav from './Nav'

const Shell = ({ children }: any) => {
  return (
    <div className="h-screen">
       <Nav />
       <main className="pt-6">{children}</main>
    </div>
  )
}

export default Shell;
