import { TradeProvider } from "./components/trades/TradeProvider"
import { TradeList } from "./components/trades/TradeList"
import { TradeDetail } from "./components/trades/TradeDetail"
import { Route } from "react-router-dom"
import { ShirtList } from "./components/shirts/ShirtList"
import { ShirtProvider } from "./components/shirts/ShirtProvider"
import { UserProvider } from "./components/users/UserProvider"
import { OfferShirtProvider } from "./components/shirts/OfferShirtProvider"
import { ShirtForm } from "./components/shirts/ShirtForm"



export const ApplicationViews = () => {
    return (
        <>
            <TradeProvider>
                <OfferShirtProvider>
                    <ShirtProvider>
                        <UserProvider>
                            <Route exact path="/trades">
                                <TradeList />
                            </Route>
                            <Route exact path="/trades/detail/:tradeId(\d+)">
                                <TradeDetail />
                            </Route>
                            <Route exact path="/trades/offers/:shirtId(\d+)">
                                <TradeDetail />
                            </Route>
                        </UserProvider>
                    </ShirtProvider>
                </OfferShirtProvider>
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