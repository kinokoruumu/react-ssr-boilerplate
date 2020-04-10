import React from "react";
import { ChunkExtractor } from "@loadable/server";
import { RootState } from "../../store/reducer";

function json2str(obj: any): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export type Props = {
  extractor: ChunkExtractor;
  styleTags: React.ReactElement<{}>[];
  preloadedState: Partial<RootState>;
  children: string;
};

export const Html = ({
  extractor,
  styleTags,
  preloadedState,
  children,
}: Props) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {extractor.getLinkElements()}
      {styleTags}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PRELOADED_STATE__ = ${json2str(preloadedState)};`,
        }}
      />

      {extractor.getScriptElements({ async: false, defer: true })}
    </body>
  </html>
);
