// ========================== KeySnail Init File =========================== //

// この領域は, GUI により設定ファイルを生成した際にも引き継がれます
// 特殊キー, キーバインド定義, フック, ブラックリスト以外のコードは, この中に書くようにして下さい
// ========================================================================= //
//{{%PRESERVE%
// ここにコードを入力して下さい
//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quit              = "C-g";
key.help              = "<f1>";
key.escape            = "C-q";
key.macroStart        = "<f3>";
key.macroEnd          = "<f4>";
key.suspend           = "<f2>";
key.universalArgument = "C-u";
key.negativeArgument1 = "C--";
key.negativeArgument2 = "C-M--";
key.negativeArgument3 = "M--";

// ================================= Hooks ================================= //

hook.addToHook('KeyBoardQuit', function (aEvent) {
    if (key.currentKeySequence.length) {
        return;
    }
    command.closeFindBar();
    if (util.isCaretEnabled()) {
        command.resetMark(aEvent);
    } else {
        goDoCommand("cmd_selectNone");
    }
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
});

// ============================= Key bindings ============================== //

key.setGlobalKey('C-M-r', function () {
    userscript.reload();
}, '設定ファイルを再読み込み', true);

key.setGlobalKey('M-x', function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'エクステ', true);

key.setGlobalKey('M-:', function () {
    command.interpreter();
}, 'コマンドインタプリタ', true);

key.setGlobalKey(["<f1>", "b"], function () {
    key.listKeyBindings();
}, 'キーバインド一覧を表示', false);

key.setGlobalKey('C-m', function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_RETURN, true);
}, 'リターンコードを生成', false);

key.setGlobalKey('C-j', function (aEvent, arg) {
    command.bookMarkToolBarJumpTo(aEvent, arg);
}, 'ブックマークツールバーのアイテムを開く', true);

key.setGlobalKey(["<f1>", "F"], function () {
    openHelpLink("firefox-help");
}, 'Firefox のヘルプを表示', false);

key.setGlobalKey(["C-x", "l"], function () {
    command.focusToById("urlbar");
}, 'ロケーションバーへフォーカス', true);

key.setGlobalKey(["C-x", "g"], function () {
    command.focusToById("searchbar");
}, '検索バーへフォーカス', true);

key.setGlobalKey(["C-x", "t"], function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, '最初のインプットエリアへフォーカス', true);

key.setGlobalKey(["C-x", "s"], function () {
    command.focusElement(command.elementsRetrieverButton, 0);
}, '最初のボタンへフォーカス', true);

key.setGlobalKey('M-w', function (aEvent) {
    command.copyRegion(aEvent);
}, '選択中のテキストをコピー', true);

key.setGlobalKey('C-s', function (ev) {
    command.iSearchForwardKs(ev);
}, 'Emacs ライクなインクリメンタル検索', true);

key.setGlobalKey('C-r', function (ev) {
    command.iSearchBackwardKs(ev);
}, 'Emacs ライクな逆方向インクリメンタル検索', true);

key.setGlobalKey(["C-x", "k"], function () {
    BrowserCloseTabOrWindow();
}, 'タブ / ウィンドウを閉じる', false);

key.setGlobalKey(["C-x", "K"], function () {
    closeWindow(true);
}, 'ウィンドウを閉じる', false);

key.setGlobalKey(["C-c", "u"], function () {
    undoCloseTab();
}, '閉じたタブを元に戻す', false);

key.setGlobalKey(["C-x", "n"], function () {
    OpenBrowserWindow();
}, 'ウィンドウを開く', false);

key.setGlobalKey('C-M-l', function () {
    gBrowser.mTabContainer.advanceSelectedTab(1, true);
}, 'ひとつ右のタブへ', false);

key.setGlobalKey('C-M-h', function () {
    gBrowser.mTabContainer.advanceSelectedTab(-1, true);
}, 'ひとつ左のタブへ', false);

key.setGlobalKey(["C-x", "C-c"], function () {
    goQuitApplication();
}, 'Firefox を終了', true);

key.setGlobalKey(["C-x", "o"], function (aEvent, aArg) {
    command.focusOtherFrame(aArg);
}, '次のフレームを選択', false);

key.setGlobalKey(["C-x", "1"], function (aEvent) {
    window.loadURI(aEvent.target.ownerDocument.location.href);
}, '現在のフレームだけを表示', true);

key.setGlobalKey(["C-x", "C-f"], function () {
    BrowserOpenFileWindow();
}, 'ファイルを開く', true);

key.setGlobalKey(["C-x", "C-s"], function () {
    saveDocument(window.content.document);
}, 'ファイルを保存', true);

key.setGlobalKey(["C-c", "C-c", "C-v"], function () {
    toJavaScriptConsole();
}, 'Javascript コンソールを表示', true);

key.setGlobalKey(["C-c", "C-c", "C-c"], function () {
    command.clearConsole();
}, 'Javascript コンソールの表示をクリア', true);

key.setEditKey([["C-SPC"], ["C-@"]], function (aEvent) {
    command.setMark(aEvent);
}, 'マークをセット', true);

key.setEditKey('C-o', function (aEvent) {
    command.openLine(aEvent);
}, '行を開く (Open line)', false);

key.setEditKey([["C-x", "u"], ["C-_"]], function () {
    display.echoStatusBar("Undo!", 2000);
    goDoCommand("cmd_undo");
}, 'アンドゥ', false);

key.setEditKey('C-\\', function () {
    display.echoStatusBar("Redo!", 2000);
    goDoCommand("cmd_redo");
}, 'リドゥ', false);

key.setEditKey('C-a', function (aEvent) {
    command.beginLine(aEvent);
}, '行頭へ移動', false);

key.setEditKey('C-e', function (aEvent) {
    command.endLine(aEvent);
}, '行末へ', false);

key.setEditKey('C-f', function (aEvent) {
    command.nextChar(aEvent);
}, '一文字右へ移動', false);

key.setEditKey('C-b', function (aEvent) {
    command.previousChar(aEvent);
}, '一文字左へ移動', false);

key.setEditKey('M-f', function (aEvent) {
    command.forwardWord(aEvent);
}, '一単語右へ移動', false);

key.setEditKey('M-b', function (aEvent) {
    command.backwardWord(aEvent);
}, '一単語左へ移動', false);

key.setEditKey('C-n', function (aEvent) {
    command.nextLine(aEvent);
}, '一行下へ', false);

key.setEditKey('C-p', function (aEvent) {
    command.previousLine(aEvent);
}, '一行上へ', false);

key.setEditKey('C-v', function (aEvent) {
    command.pageDown(aEvent);
}, '一画面分下へ', false);

key.setEditKey('M-v', function (aEvent) {
    command.pageUp(aEvent);
}, '一画面分上へ', false);

key.setEditKey('M-<', function (aEvent) {
    command.moveTop(aEvent);
}, 'テキストエリア先頭へ', false);

key.setEditKey('M->', function (aEvent) {
    command.moveBottom(aEvent);
}, 'テキストエリア末尾へ', false);

key.setEditKey('C-d', function () {
    goDoCommand("cmd_deleteCharForward");
}, '次の一文字削除', false);

key.setEditKey('C-h', function () {
    goDoCommand("cmd_deleteCharBackward");
}, '前の一文字を削除', false);

key.setEditKey('M-d', function () {
    command.deleteForwardWord(ev);
}, '次の一単語を削除', false);

key.setEditKey([["C-<backspace>"], ["M-<delete>"]], function (ev) {
    command.deleteBackwardWord(ev);
}, '前の一単語を削除', false);

key.setEditKey('M-u', function (ev, arg) {
    command.wordCommand(ev, arg, command.upcaseForwardWord, command.upcaseBackwardWord);
}, '次の一単語を全て大文字に (Upper case)', false);

key.setEditKey('M-l', function (ev, arg) {
    command.wordCommand(ev, arg, command.downcaseForwardWord, command.downcaseBackwardWord);
}, '次の一単語を全て小文字に (Lower case)', false);

key.setEditKey('M-c', function (ev, arg) {
    command.wordCommand(ev, arg, command.capitalizeForwardWord, command.capitalizeBackwardWord);
}, '次の一単語をキャピタライズ', false);

key.setEditKey('C-k', function (aEvent) {
    command.killLine(aEvent);
}, 'カーソルから先を一行カット (Kill line)', false);

key.setEditKey('C-y', command.yank, '貼り付け (Yank)', false);

key.setEditKey('M-y', command.yankPop, '古いクリップボードの中身を順に貼り付け (Yank pop)', true);

key.setEditKey('C-M-y', function (aEvent) {
    if (!command.kill.ring.length) {
        return;
    }
    let (ct = command.getClipboardText()) (!command.kill.ring.length || ct != command.kill.ring[0]) &&
        command.pushKillRing(ct);
    prompt.selector({message: "Paste:", collection: command.kill.ring, callback: function (i) {if (i >= 0) {key.insertText(command.kill.ring[i]);}}});
}, '以前にコピーしたテキスト一覧から選択して貼り付け', true);

key.setEditKey('C-w', function (aEvent) {
    goDoCommand("cmd_copy");
    goDoCommand("cmd_delete");
    command.resetMark(aEvent);
}, '選択中のテキストを切り取り (Kill region)', true);

key.setEditKey(["C-x", "r", "d"], function (aEvent, aArg) {
    command.replaceRectangle(aEvent.originalTarget, "", false, !aArg);
}, '矩形削除', true);

key.setEditKey(["C-x", "r", "t"], function (aEvent) {
    prompt.read("String rectangle: ", function (aStr, aInput) {command.replaceRectangle(aInput, aStr);}, aEvent.originalTarget);
}, '矩形置換', true);

key.setEditKey(["C-x", "r", "o"], function (aEvent) {
    command.openRectangle(aEvent.originalTarget);
}, '矩形行空け', true);

key.setEditKey(["C-x", "r", "k"], function (aEvent, aArg) {
    command.kill.buffer = command.killRectangle(aEvent.originalTarget, !aArg);
}, '矩形キル', true);

key.setEditKey(["C-x", "r", "y"], function (aEvent) {
    command.yankRectangle(aEvent.originalTarget, command.kill.buffer);
}, '矩形ヤンク', true);

key.setEditKey('M-n', function () {
    command.walkInputElement(command.elementsRetrieverTextarea, true, true);
}, '次のテキストエリアへフォーカス', false);

key.setEditKey('M-p', function () {
    command.walkInputElement(command.elementsRetrieverTextarea, false, true);
}, '前のテキストエリアへフォーカス', false);

key.setViewKey([["C-n"], ["j"]], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, '一行スクロールダウン', false);

key.setViewKey([["C-p"], ["k"]], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_UP, true);
}, '一行スクロールアップ', false);

key.setViewKey([["C-f"], ["."]], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, '左へスクロール', false);

key.setViewKey([["C-b"], [","]], function (aEvent) {
    key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, '右へスクロール', false);

key.setViewKey([["M-v"], ["b"]], function () {
    goDoCommand("cmd_scrollPageUp");
}, '一画面分スクロールアップ', false);

key.setViewKey('C-v', function () {
    goDoCommand("cmd_scrollPageDown");
}, '一画面スクロールダウン', false);

key.setViewKey([["M-<"], ["g"]], function () {
    goDoCommand("cmd_scrollTop");
}, 'ページ先頭へ移動', true);

key.setViewKey([["M->"], ["G"]], function () {
    goDoCommand("cmd_scrollBottom");
}, 'ページ末尾へ移動', true);

key.setViewKey('l', function () {
    gBrowser.mTabContainer.advanceSelectedTab(1, true);
}, 'ひとつ右のタブへ', false);

key.setViewKey('h', function () {
    gBrowser.mTabContainer.advanceSelectedTab(-1, true);
}, 'ひとつ左のタブへ', false);

key.setViewKey('R', function () {
    BrowserReload();
}, '更新', true);

key.setViewKey('B', function () {
    BrowserBack();
}, '戻る', false);

key.setViewKey('F', function () {
    BrowserForward();
}, '進む', false);

key.setViewKey(["C-x", "h"], function () {
    goDoCommand("cmd_selectAll");
}, 'すべて選択', true);

key.setViewKey('f', function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, '最初のインプットエリアへフォーカス', true);

key.setViewKey('M-p', function () {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, '次のボタンへフォーカスを当てる', false);

key.setViewKey('M-n', function () {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, '前のボタンへフォーカスを当てる', false);

key.setCaretKey([["C-a"], ["^"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
}, 'キャレットを行頭へ移動', false);

key.setCaretKey([["C-e"], ["$"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'キャレットを行末へ移動', false);

key.setCaretKey([["C-n"], ["j"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
}, 'キャレットを一行下へ', false);

key.setCaretKey([["C-p"], ["k"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
}, 'キャレットを一行上へ', false);

key.setCaretKey([["C-f"], ["l"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'キャレットを一文字右へ移動', false);

key.setCaretKey([["C-b"], ["h"], ["C-h"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'キャレットを一文字左へ移動', false);

key.setCaretKey([["M-f"], ["w"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'キャレットを一単語右へ移動', false);

key.setCaretKey([["M-b"], ["W"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'キャレットを一単語左へ移動', false);

key.setCaretKey([["C-v"], ["SPC"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'キャレットを一画面分下へ', false);

key.setCaretKey([["M-v"], ["b"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
}, 'キャレットを一画面分上へ', false);

key.setCaretKey([["M-<"], ["g"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
}, 'キャレットをページ先頭へ移動', false);

key.setCaretKey([["M->"], ["G"]], function (aEvent) {
    aEvent.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'キャレットを行末へ移動', false);

key.setCaretKey('J', function () {
    util.getSelectionController().scrollLine(true);
}, '画面を一行分下へスクロール', false);

key.setCaretKey('K', function () {
    util.getSelectionController().scrollLine(false);
}, '画面を一行分上へスクロール', false);

key.setCaretKey(',', function () {
    util.getSelectionController().scrollHorizontal(true);
    goDoCommand("cmd_scrollLeft");
}, '左へスクロール', false);

key.setCaretKey('.', function () {
    goDoCommand("cmd_scrollRight");
    util.getSelectionController().scrollHorizontal(false);
}, '右へスクロール', false);

key.setCaretKey('z', function (aEvent) {
    command.recenter(aEvent);
}, 'キャレットの位置までスクロール', false);

key.setCaretKey([["C-SPC"], ["C-@"]], function (aEvent) {
    command.setMark(aEvent);
}, 'マークをセット', true);

key.setCaretKey('R', function () {
    BrowserReload();
}, '更新', true);

key.setCaretKey('B', function () {
    BrowserBack();
}, '戻る', false);

key.setCaretKey('F', function () {
    BrowserForward();
}, '進む', false);

key.setCaretKey(["C-x", "h"], function () {
    goDoCommand("cmd_selectAll");
}, 'すべて選択', true);

key.setCaretKey('f', function () {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, '最初のインプットエリアへフォーカス', true);

key.setCaretKey('M-p', function () {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, '次のボタンへフォーカスを当てる', false);

key.setCaretKey('M-n', function () {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, '前のボタンへフォーカスを当てる', false);

