'use strict';
import * as vscode from 'vscode';
// import * as tr from 'perl-transliterate';

import * as snippets from './snippets.json';

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems(doc, pos, token, context) {
            const quote = vscode.workspace.getConfiguration('jasmineSnippets').get("quoteStyle", "`");
            console.log(quote);

            let quotes = [`'`,`"`,'`'];
            quotes = quotes.filter(quoteType => quoteType !== quote);
            return Object.keys(snippets).map(snippetType => {
                const snippetDetails = snippets[snippetType];
                let insertText = snippetDetails.body;
                // quotes.forEach(quoteType => {
                //     insertText = tr(insertText, quoteType, quote)
                // })
                return {
                    label: snippetDetails.prefix,
                    detail: snippetDetails.description,
                    kind: vscode.CompletionItemKind.Snippet,
                    insertText,
                };
            });
        }
    });
}
