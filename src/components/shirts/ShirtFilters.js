import { reactDom } from "react-router-dom"
import React, { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import { ShirtList } from "./ShirtList";


const sortByMostRecent = () => {
    thisArray.sort(function(a,b) {
        return a.timestamp - b.timestamp
    }) 
}


// const filterApp = () => {
//     return (
//         <div>
            
//         </div>
//     )
// }

// const FilterShirtsBySelectedUserId = (selectedUserserId) => {
//     selectedUserShirts = shirts.filter((shirt) => shirt.userId === selectedUserserId)
//     setShirts(selectedUserShirts)
// }


// export const UserDropDown = () => {
//     const {users} = useContext(UserContext)
//     return (
//         <div className="filter-by-user">
//             <select className="user_select" onChange={ (user) => {
//                 const selectedUserShirts = shirts.filter((shirt) => shirt.userId === user.id)
//                 setActiveShirts(selectedUserShirts)
//             }}>
//                 {
//                     users.map(user=> {
//                         return (
//                             <option className="user_option" value={user.id}>{user.firstName} {user.lastName}</option>
//                         )
//                     })
//                 }

//             </select>
//         </div>
//     )
// }


// const users = getUsers()
// let html = "<div className='shirtsByUser'>"
// html += "Posts by user <select id='userSelection'>"
// html += users.map((user) => {
//     return `option name="selectedUser" value="${user.id}"${user.name}</option>`
// }
// )
// html += "</select>"
// html += "</div>"
// return html