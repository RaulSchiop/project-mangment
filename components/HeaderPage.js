import HeaderPageClient from "./HeaderPageInside"
export default function HeaderPage({user}){
  return (<>
  <HeaderPageClient users={user}></HeaderPageClient></>
  )
}