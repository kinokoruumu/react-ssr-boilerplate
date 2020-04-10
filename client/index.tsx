import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import SweetScroll from "sweet-scroll";
import { createBrowserHistory } from "history";
import { RootState } from "../store/reducer";
import { configureStore } from "../store/index";
import { createRouter } from "../foundation/routing/index";
import { createMiddleware } from "../foundation/routing/Middleware";
import { Provider } from "react-redux";
import { RouteRenderer } from "../store/routing/containers/RouteRenderer";

function getPreloadedState(): RootState {
  const win = window as any;
  const preloadedState: RootState = win.__PRELOADED_STATE__;
  delete win.__PRELOADED_STATE__;

  return preloadedState;
}

loadableReady(async () => {
  const app = document.getElementById("app");

  // smooth scroll
  SweetScroll.create();

  // redux
  const history = createBrowserHistory();
  const preloadedState = getPreloadedState();

  const store = configureStore({ history, preloadedState });
  const router = createRouter({ store, history }, createMiddleware(true));

  const { layout, content, deferAction } = await router.resolve(
    history.location.pathname,
  );

  try {
    ReactDOM.hydrate(
      <Provider store={store}>
        <RouteRenderer
          history={history}
          router={router}
          initialLayout={layout}
          component={({ children }) => <div>{children}</div>}
        >
          {content}
        </RouteRenderer>
      </Provider>,
      app,
      () => {
        if (deferAction != null) {
          deferAction();
        }
      },
    );
  } catch (e) {
    console.error("Client bootstrapping error");
  }
});
