import { MessageProvider } from "./components/messages/MessageProvider"
import { MessageList } from "./components/messages/MessageList"
import { MessageDetail } from "./components/messages/MessageDetail"
import { Route } from "react-router-dom"
import { ShirtList } from "./components/shirts/ShirtList"
import { ShirtProvider } from "./components/shirts/ShirtProvider"
import { UserProvider } from "./components/users/UserProvider"




export const ApplicationViews = () => {
    return (
        <>
            <MessageProvider>
                <ShirtProvider>
                    <UserProvider>
                        <Route exact path="/messages">
                            <MessageList />
                        </Route>
                        <Route exact path="/messages/detail/:messageId(\d+)">
                            <MessageDetail />
                        </Route>
                    </UserProvider>
                </ShirtProvider>
            </MessageProvider>
            <ShirtProvider>
                <UserProvider>
                    <Route exact path="/shirts">
                        <ShirtList />
                    </Route>
                </UserProvider>
            </ShirtProvider>

        </>
    )
}