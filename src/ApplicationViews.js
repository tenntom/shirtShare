import { TradeProvider } from "./components/trades/TradeProvider"
import { TradeList } from "./components/trades/TradeList"
import { TradeDetail } from "./components/trades/TradeDetail"
import { Route } from "react-router-dom"
import { ShirtList } from "./components/shirts/ShirtList"
import { ShirtProvider } from "./components/shirts/ShirtProvider"
import { UserProvider } from "./components/users/UserProvider"
import { ShirtForm } from "./components/shirts/ShirtForm"
import { TradeForm } from "./components/trades/TradeForm"



export const ApplicationViews = () => {
    return (
        <>
            <TradeProvider>
                    <ShirtProvider>
                        <UserProvider>
                            <Route exact path="/trades">
                                <TradeList />
                            </Route>
                            <Route exact path="/trades/detail/:tradeId(\d+)">
                                <TradeDetail />
                            </Route>
                            <Route exact path="/trades/create">
                                <TradeForm />
                            </Route>
                        </UserProvider>
                    </ShirtProvider>
            </TradeProvider>
            <ShirtProvider>
                <UserProvider>
                    <Route exact path="/shirts">
                        <ShirtList />
                    </Route>
                    <Route exact path="/shirts/create">
                        <ShirtForm />
                    </Route>
                </UserProvider>
            </ShirtProvider>

        </>
    )
}