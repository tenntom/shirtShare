import { TradeProvider } from "./components/trades/TradeProvider"
import { TradeList } from "./components/trades/TradeList"
import { TradeDetail } from "./components/trades/TradeDetail"
import { Route } from "react-router-dom"
import { ShirtList } from "./components/shirts/ShirtList"
import { ShirtProvider } from "./components/shirts/ShirtProvider"
import { UserProvider } from "./components/users/UserProvider"
import { ShirtForm } from "./components/shirts/ShirtForm"
import { TradeForm } from "./components/trades/TradeForm"
import { OffersReceivedList } from "./components/trades/OffersReceivedList"
import { OfferSentList } from "./components/trades/OffersSentList"
import { ShirtSearch } from "./components/shirts/ShirtSearch"

// Two main routes here, one for the trades/offers and another for the shirt postings.

export const ApplicationViews = () => {
    return (
        <>
            <TradeProvider>
                    <ShirtProvider>
                        <UserProvider>
                            {/* Again, this is not currently used, but could be added in again.
                            <Route exact path="/trades">
                                <TradeList />
                            </Route> */}
                            <Route exact path="/trades/received">
                                <OffersReceivedList />
                            </Route>
                            <Route exact path="/trades/sent">
                                <OfferSentList />
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
                    <TradeProvider>
                    <Route exact path="/">
                        <ShirtList />
                    </Route>
                    <Route exact path="/create">
                        <ShirtForm />
                    </Route>
                    <Route exact path="/edit/:shirtId(\d+)">
                        <ShirtForm />
                    </Route>
                    </TradeProvider>
                </UserProvider>
            </ShirtProvider>

        </>
    )
}