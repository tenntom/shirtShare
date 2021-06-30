import { reactDom } from "react-router-dom"
import React from "react";


const filterApp = () => {
    return (
        <div>
            
        </div>
    )
}






export const UserDropDown = () => {
    return (
        <div className="filter-by-user">
            <select className="user_select">
                {
                    users.map(user=> {
                        return (
                            <option className="user_option" value={user.id}>{user.firstName} {user.lastName}</option>
                        )
                    })
                }

            </select>
        </div>
    )
}


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