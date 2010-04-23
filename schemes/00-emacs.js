var EXPORTED_SYMBOLS = ["SCHEME"];

var SCHEME = {
    name: {
        ja: "とにかく Emacs / w3m",
        en: "Full Emacs / w3m"
    },
    description: {
        ja: "Emacs や w3m のキーバインドを最大限に再現したスキームです。",
        en: "Provides fully emulated Emacs and w3m keybindings."
    },
    icon: "chrome://keysnail/skin/icon/emacs.png",
    hooks: [],
    keybindings: {},
    prefs: {
        "keyhandler.use_prefix_argument" : true
    },
    specialKeys: {
        'quit'              : 'C-g',
        'help'              : '<f1>',
        'escape'            : 'C-q',
        'macroStart'        : '<f3>',
        'macroEnd'          : '<f4>',
        'suspend'           : '<f2>',
        'universalArgument' : 'C-u',
        'negativeArgument1' : 'C--',
        'negativeArgument2' : 'C-M--',
        'negativeArgument3' : 'M--'
    },
    preserved: null
};

// Hooks {{ ================================================================= //

SCHEME.hooks.push(
    ["KeyBoardQuit",
     function (aEvent) {
         if (key.currentKeySequence.length)
             return;

         command.closeFindBar();

         if (util.isCaretEnabled())
             command.resetMark(aEvent);
         else
             goDoCommand('cmd_selectNone');

         key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
     }]
);

// }} ======================================================================= //

// Key bindings {{ ========================================================== //

SCHEME.keybindings["global"] = [
    // KeySnail
    ["C-M-r", "reload_the_initialization_file", true],
    ["M-x", "ext_select", true],
    ["M-:", "command_interpreter", true],
    [[SCHEME.specialKeys.help, "b"], "list_all_keybindings"],
    // Misc
    ["C-m", "generate_the_return_key_code"],
    [[SCHEME.specialKeys.help, "F"], "display_firefox_help"],
    // Focus
    [["C-x", "t"], "focus_to_the_first_textarea", true],
    [["C-x", "s"], "focus_to_the_first_button", true],
    // For Mac users, this will affect
    ["M-w", "copy_selected_text", true],
    // Tab / Window
    [["C-x", "k"], "close_tab_window"],
    [["C-x", "K"], "close_the_window"],
    ["C-M-l", "select_next_tab"],
    ["C-M-h", "select_previous_tab"],
    // Misc
    [["C-x", "C-c"], "exit_firefox", true],
    [["C-x", "o"], "select_next_frame"],
    [["C-x", "C-f"], "open_the_local_file", true],
    [["C-x", "C-s"], "save_current_page_to_the_file", true],
    [["C-c", "C-c", "C-v"], "display_javascript_console", true],
    [["C-c", "C-c", "C-c"], "clear_javascript_console", true]
];

SCHEME.keybindings["edit"] = [
    // selection
    [["C-x", "h"], "select_whole_text", true],
    // Scroll
    [[["C-SPC"], ["C-@"]], "set_the_mark", true],
    ["C-o", "open_line"],
    [[["C-x", "u"], ["C-_"]], "undo"],
    ["C-\\", "redo"],
    // intra line
    ["C-a", "beginning_of_the_line"],
    ["C-e", "end_of_the_line"],
    ["C-f", "forward_char"],
    ["C-b", "backward_char"],
    ["M-f", "next_word"],
    ["M-b", "previous_word"],
    // by line
    ["C-n", "next_line"],
    ["C-p", "previous_line"],
    ["C-v", "page_down"],
    ["M-v", "page_up"],
    ["M-<", "beginning_of_the_text_area"],
    ["M->", "end_of_the_text_area"],
    // deletion
    ["C-d", "delete_forward_char"],
    ["C-h", "delete_backward_char"],
    ["M-d", "delete_forward_word"],
    [[["C-<backspace>"], ["M-<delete>"]], "delete_backward_word"],
    // transformation
    ["M-u", "convert_following_word_to_upper_case"],
    ["M-l", "convert_following_word_to_lower_case"],
    ["M-c", "capitalize_the_following_word"],
    // cut / passte
    ["C-k", "kill_the_rest_of_the_line"],
    ["C-y", "paste"],
    ["M-y", "paste_pop", true],
    ["C-M-y", "show_kill_ring_and_select_text_to_paste", true],
    ["C-w", "cut_current_region", true],
    // string rectangle
    [["C-x", "r", "d"], "delete_text_in_the_region_rectangle", true],
    [["C-x", "r", "t"], "replace_text_in_the_region_rectangle_with_user_inputted_string", true],
    [["C-x", "r", "o"], "blank_out_the_region_rectangle_shifting_text_right", true],
    [["C-x", "r", "k"], "delete_the_region_rectangle_and_save_it_as_the_last_killed_one", true],
    [["C-x", "r", "y"], "yank_the_last_killed_rectangle_with_upper_left_corner_at_point", true],
    // focus
    ["M-n", "focus_to_the_next_text_area"],
    ["M-p", "focus_to_the_previous_text_area"]
];

SCHEME.keybindings["view"] = [
    // Scroll
    [[["C-n"], ["j"]], "scroll_line_down"],
    [[["C-p"], ["k"]], "scroll_line_up"],
    [[["C-f"], ["."]], "scroll_right"],
    [[["C-b"], [","]], "scroll_left"],
    [[["M-v"], ["b"]], "scroll_page_up"],
    ["C-v", "scroll_page_down"],
    [[["M-<"], ["g"]], "scroll_to_the_top_of_the_page", true],
    [[["M->"], ["G"]], "scroll_to_the_bottom_of_the_page", true],
    // tab
    ["l", "select_next_tab"],
    ["h", "select_previous_tab"]
];

SCHEME.keybindings["caret"] = [
    // move caret
    [[["C-a"], ["^"]], "move_caret_to_the_beginning_of_the_line"],
    [[["C-e"], ["$"]], "move_caret_to_the_end_of_the_line"],
    // move caret jklh
    [[["C-n"], ["j"]], "move_caret_to_the_next_line"],
    [[["C-p"], ["k"]], "move_caret_to_the_previous_line"],
    [[["C-f"], ["l"]], "move_caret_to_the_right"],
    [[["C-b"], ["h"], ["C-h"]], "move_caret_to_the_left"],
    // move caret by word
    [[["M-f"], ["w"]], "move_caret_to_the_right_by_word"],
    [[["M-b"], ["W"]], "move_caret_to_the_left_by_word"],
    [[["C-v"], ["SPC"]], "move_caret_down_by_page"],
    [[["M-v"], ["b"]], "move_caret_up_by_page"],
    [[["M-<"], ["g"]], "move_caret_to_the_top_of_the_page"],
    [[["M->"], ["G"]], "move_caret_to_the_end_of_the_line"],
    // scroll page
    ["J", "scroll_line_down_caret"],
    ["K", "scroll_line_up_caret"],
    [",", "scroll_left_caret"],
    [".", "scroll_right_caret"],
    ["z", "scroll_to_the_cursor_position"],
    // selection
    [[["C-SPC"], ["C-@"]], "set_the_mark", true]
];

var nonEditableCommon = [
    // Navigation
    [["C-x", "h"], "select_all", true]
];

SCHEME.keybindings["view"]  = SCHEME.keybindings["view"].concat(nonEditableCommon);
SCHEME.keybindings["caret"] = SCHEME.keybindings["caret"].concat(nonEditableCommon);

// }} ======================================================================= //

