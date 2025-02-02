"use strict";

// Immediately check if the user is on a mobile device.
// If yes, hide the sidenav (if it exists), display a warning, and stop the rest of the script.
if (/Mobi|Android/i.test(navigator.userAgent)) {
  var sideNavEl = document.getElementById("sidenav");
  if (sideNavEl) {
    sideNavEl.style.display = "none";
  }
  alert("This website won't work on mobile, ensure to visit this website from a desktop to visit it!");
  document.write("<h2 style='text-align:center;margin-top:50px;'>This website won't work on mobile. Please use a desktop for the best experience!</h2>");
  throw new Error("Mobile device detected. Halting script execution.");
}

var configs = (function () {
  var instance;
  var Singleton = function (options) {
    var options = options || Singleton.defaultOptions;
    for (var key in Singleton.defaultOptions) {
      this[key] = options[key] || Singleton.defaultOptions[key];
    }
  };
  Singleton.defaultOptions = {
    general_help: "Below there's a list of commands that you can use.",
    ls_help: "List information about the files and folders (the current directory by default).",
    open_help: "Open FILE(s) content and print it to the standard output (screen).",
    whoami_help: "Print the user name associated with the current effective user ID and more info.",
    help_help: "Print this menu.",
    clear_help: "Clear the terminal screen.",
    reboot_help: "Reboot the system.",
    // Removed welcome and welcome_file_name:
    // welcome_file_name: "welcome_message.txt",
    // welcome: "Welcome to FTW (Fake Terminal Website)! :)\n[...rest of old welcome text removed for brevity...]",
    internet_explorer_warning: "NOTE: I see you're using internet explorer, this website won't work properly.",
    invalid_command_message: "<value>: command not found.",
    reboot_message: "Preparing to reboot...\n\n",
    permission_denied_message: "Unable to '<value>', permission denied.",
    usage: "Usage",
    file: "file",
    file_not_found: "File '<value>' not found.",
    username: "Username",
    hostname: "Host",
    platform: "Platform",
    accesible_cores: "Accessible cores",
    language: "Language",
    value_token: "<value>",
    host: "germabyte.github.io",
    user: "guest",
    is_root: false,
    type_delay: 2
  };
  return {
    getInstance: function (options) {
      if (instance === void 0) {
        instance = new Singleton(options);
      }
      return instance;
    }
  };
})();

var files = (function () {
  var instance;
  var Singleton = function (options) {
    var options = options || Singleton.defaultOptions;
    for (var key in Singleton.defaultOptions) {
      this[key] = options[key] || Singleton.defaultOptions[key];
    }
  };
  Singleton.defaultOptions = {
    "about.txt": "This website was made using only pure JavaScript with no extra libraries.\nI made it dynamic so anyone can use it, just download it from GitHub and change the config text according to your needs.\nIf you manage to find any bugs or security issues feel free to email me: luisbraganca@protonmail.com",
    // Removed "getting_started.txt".
    "contact.txt": "mail@example.com",
    "social_network_1.txt": "https://www.socialite.com/username/",
    "social_network_2.txt": "https://example.com/profile/9382/"
  };
  return {
    getInstance: function (options) {
      if (instance === void 0) {
        instance = new Singleton(options);
      }
      return instance;
    }
  };
})();

var main = (function () {

  var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

  var scrollToBottom = function () {
    window.scrollTo(0, document.body.scrollHeight);
  };

  var isURL = function (str) {
    return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
  };

  var getOS = function() {
    var userAgent = window.navigator.userAgent;
    var platform = window.navigator.platform;
    var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    var os = 'Unknown OS';

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  };

  var getBrowser = function() {
    var userAgent = navigator.userAgent;
    var browser = 'Unknown Browser';
    
    if (userAgent.indexOf("Firefox") > -1) {
      browser = "Firefox";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      browser = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
      browser = "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      browser = "Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
      browser = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      browser = "Safari";
    }
    
    return browser;
  };

  var InvalidArgumentException = function (message) {
    this.message = message;
    if ("captureStackTrace" in Error) {
      Error.captureStackTrace(this, InvalidArgumentException);
    } else {
      this.stack = (new Error()).stack;
    }
  };
  InvalidArgumentException.prototype = Object.create(Error.prototype);
  InvalidArgumentException.prototype.name = "InvalidArgumentException";
  InvalidArgumentException.prototype.constructor = InvalidArgumentException;

  var cmds = {
    LS: { value: "ls", help: configs.getInstance().ls_help },
    OPEN: { value: "open", help: configs.getInstance().open_help },
    WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
    HELP: { value: "help", help: configs.getInstance().help_help },
    CLEAR: { value: "clear", help: configs.getInstance().clear_help },
    REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
  };

  var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
    if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
      throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
    }
    if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
      throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
    }
    if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
      throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
    }
    if (!(sidenav instanceof Node) || sidenav.nodeName.toUpperCase() !== "DIV") {
      throw new InvalidArgumentException("Invalid value " + sidenav + " for argument 'sidenav'.");
    }
    if (!(profilePic instanceof Node) || profilePic.nodeName.toUpperCase() !== "IMG") {
      throw new InvalidArgumentException("Invalid value " + profilePic + " for argument 'profilePic'.");
    }
    (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~" + (root ? "#" : "$"));
    this.profilePic = profilePic;
    this.prompt = prompt;
    this.cmdLine = cmdLine;
    this.output = output;
    this.sidenav = sidenav;
    this.sidenavOpen = false;
    this.sidenavElements = [];
    this.typeSimulator = new TypeSimulator(outputTimer, output);
  };

  Terminal.prototype.type = function (text, callback) {
    this.typeSimulator.type(text, callback);
  };

  Terminal.prototype.exec = function () {
    var command = this.cmdLine.value;
    this.cmdLine.value = "";
    this.prompt.textContent = "";
    this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
  };

  Terminal.prototype.init = function () {
    this.sidenav.addEventListener("click", function(e) {
      e.stopPropagation(); 
    });
    this.cmdLine.disabled = true;
    this.sidenavElements.forEach(function (elem) {
      elem.disabled = true;
    });
    this.prepareSideNav();
    this.lock();

    document.body.addEventListener("click", function (event) {
      if (this.sidenavOpen) {
        this.handleSidenav(event);
      }
    }.bind(this));

    document.addEventListener('keydown', function(event) {
      if (this.cmdLine.disabled) {
        return;
      }
      
      const target = event.target;
      if (target !== this.cmdLine) {
        const excludedTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A'];
        if (excludedTags.includes(target.tagName) || target.isContentEditable) {
          return;
        }
      }

      event.preventDefault();
      this.cmdLine.focus();

      const key = event.key;
      const cmdLine = this.cmdLine;
      let start = cmdLine.selectionStart;
      let end = cmdLine.selectionEnd;
      let value = cmdLine.value;

      switch (key) {
        case 'Enter':
          this.handleCmd();
          break;
        case 'Backspace':
          if (start === end && start > 0) {
            cmdLine.value = value.slice(0, start - 1) + value.slice(start);
            cmdLine.setSelectionRange(start - 1, start - 1);
          } else if (start !== end) {
            cmdLine.value = value.slice(0, start) + value.slice(end);
            cmdLine.setSelectionRange(start, start);
          }
          break;
        case 'Delete':
          if (start === end && start < value.length) {
            cmdLine.value = value.slice(0, start) + value.slice(start + 1);
            cmdLine.setSelectionRange(start, start);
          } else if (start !== end) {
            cmdLine.value = value.slice(0, start) + value.slice(end);
            cmdLine.setSelectionRange(start, start);
          }
          break;
        case 'ArrowLeft':
          if (start > 0) cmdLine.setSelectionRange(start - 1, start - 1);
          break;
        case 'ArrowRight':
          if (start < value.length) cmdLine.setSelectionRange(start + 1, start + 1);
          break;
        default:
          if (key.length === 1) {
            cmdLine.value = value.slice(0, start) + key + value.slice(end);
            cmdLine.setSelectionRange(start + 1, start + 1);
          }
          break;
      }

      scrollToBottom();
    }.bind(this));

    this.reset();
  };

  Terminal.makeElementDisappear = function (element) {
    element.style.opacity = 0;
    element.style.transform = "translateX(-300px)";
  };

  Terminal.makeElementAppear = function (element) {
    element.style.opacity = 1;
    element.style.transform = "translateX(0)";
  };

  Terminal.prototype.prepareSideNav = function () {
    var capFirst = (function () {
      return function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    })();
    for (var file in files.getInstance()) {
      var element = document.createElement("button");
      Terminal.makeElementDisappear(element);
      element.onclick = function (file, event) {
        this.handleSidenav(event);
        this.cmdLine.value = "open " + file + " ";
        this.handleCmd();
      }.bind(this, file);
      element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
      this.sidenav.appendChild(element);
      this.sidenavElements.push(element);
    }
    var sidenavBtn = document.getElementById("sidenavBtn");
    if (sidenavBtn) {
      sidenavBtn.addEventListener("click", this.handleSidenav.bind(this));
    }
  };

  Terminal.prototype.handleSidenav = function (event) {
    if (this.sidenavOpen) {
      this.profilePic.style.opacity = 0;
      this.sidenavElements.forEach(Terminal.makeElementDisappear);
      this.sidenav.style.width = "50px";
      var sidenavBtn = document.getElementById("sidenavBtn");
      if (sidenavBtn) {
        sidenavBtn.innerHTML = "☰";
        sidenavBtn.blur();
      }
      this.sidenavOpen = false;
    } else {
      this.sidenav.style.width = "300px";
      this.sidenavElements.forEach(Terminal.makeElementAppear);
      var sidenavBtn = document.getElementById("sidenavBtn");
      if (sidenavBtn) {
        sidenavBtn.innerHTML = "×";
        sidenavBtn.blur();
      }
      this.profilePic.style.opacity = 1;
      this.sidenavOpen = true;
    }
    event.stopPropagation();
  };

  Terminal.prototype.lock = function () {
    this.exec();
    this.cmdLine.blur();
    this.cmdLine.disabled = true;
    this.sidenavElements.forEach(function (elem) {
      elem.disabled = true;
    });
  };

  Terminal.prototype.unlock = function () {
    this.cmdLine.disabled = false;
    this.prompt.textContent = this.completePrompt;
    this.sidenavElements.forEach(function (elem) {
      elem.disabled = false;
    });
    scrollToBottom();
    this.focus();
  };

  Terminal.prototype.handleCmd = function () {
    var cmdComponents = this.cmdLine.value.trim().split(" ");
    this.lock();
    switch (cmdComponents[0]) {
      case cmds.OPEN.value:
        this.open(cmdComponents);
        break;
      case cmds.LS.value:
        this.ls();
        break;
      case cmds.WHOAMI.value:
        this.whoami(cmdComponents);
        break;
      case cmds.HELP.value:
        this.help();
        break;
      case cmds.CLEAR.value:
        this.clear();
        break;
      case cmds.REBOOT.value:
        this.reboot();
        break;
      default:
        this.invalidCommand(cmdComponents);
        break;
    }
  };

  Terminal.prototype.open = function (cmdComponents) {
    var result;
    if (cmdComponents.length <= 1) {
      result = configs.getInstance().usage + ": " + cmds.OPEN.value + " <" + configs.getInstance().file + ">";
    } 
    else if (
      !cmdComponents[1] ||
      // Removed check for "welcome_file_name"
      !files.getInstance().hasOwnProperty(cmdComponents[1])
    ) {
      result = configs.getInstance().file_not_found.replace(
        configs.getInstance().value_token,
        cmdComponents[1]
      );
    } else {
      // Removed the condition that checks for "welcome_message.txt" 
      result = files.getInstance()[cmdComponents[1]];
    }
    this.type(result, this.unlock.bind(this));
  };

  Terminal.prototype.ls = function () {
    // Removed listing of welcome_message.txt
    var result = "";
    for (var file in files.getInstance()) {
      result += file + "\n";
    }
    this.type(result.trim(), this.unlock.bind(this));
  };

  Terminal.prototype.whoami = function (cmdComponents) {
    var os = getOS();
    var browser = getBrowser();
    var screenRes = window.screen.width + 'x' + window.screen.height;
    var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" +
                 configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" +
                 "OS: " + os + "\n" +
                 "Browser: " + browser + "\n" +
                 "Screen Resolution: " + screenRes;
    this.type(result, this.unlock.bind(this));
  };

  Terminal.prototype.help = function () {
    var result = configs.getInstance().general_help + "\n\n";
    for (var cmd in cmds) {
      result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
    }
    this.type(result.trim(), this.unlock.bind(this));
  };

  Terminal.prototype.clear = function () {
    this.output.textContent = "";
    this.prompt.textContent = "";
    this.prompt.textContent = this.completePrompt;
    this.unlock();
  };

  Terminal.prototype.reboot = function () {
    this.type(configs.getInstance().reboot_message, function () {
      var dots = ["/", "-", "\\", "|"];
      var dotIndex = 0;
      var rebootMsg = "Rebooting"; // Shortened message
      var rebootLine = null; // Reference to the reboot line
      var countdown = 3; // Initial countdown value

      var updateOutput = function (output, message, currentDot, count) {
        // Check if the reboot line exists
        if (!rebootLine) {
          output.innerHTML += message + " in " + count + "s " + currentDot + "<br/>";
          rebootLine = output.lastChild; // Get the reference to the <br> tag
        } else {
          rebootLine.previousSibling.textContent = message + " in " + count + "s " + currentDot;
        }
        scrollToBottom();
      };

      var rebootInterval = setInterval(function () {
        updateOutput(this.output, rebootMsg, dots[dotIndex], countdown);
        dotIndex = (dotIndex + 1) % dots.length;

        // Decrement countdown every second
        if (dotIndex === 0) {
          countdown--;
        }

        // End reboot sequence when countdown reaches 0
        if (countdown < 0) {
          clearInterval(rebootInterval);
          this.reset();
        }
      }.bind(this), 250);
    }.bind(this));
  };

  Terminal.prototype.reset = function () {
    this.output.textContent = "";
    this.prompt.textContent = "";
    if (this.typeSimulator) {
      // Show about.txt content instead of welcome
      this.type(
        files.getInstance()["about.txt"] +
        (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""),
        function () {
          this.unlock();
        }.bind(this)
      );
    }
  };

  Terminal.prototype.permissionDenied = function (cmdComponents) {
    this.type(
      configs.getInstance().permission_denied_message.replace(
        configs.getInstance().value_token,
        cmdComponents[0]
      ),
      this.unlock.bind(this)
    );
  };

  Terminal.prototype.invalidCommand = function (cmdComponents) {
    this.type(
      configs.getInstance().invalid_command_message.replace(
        configs.getInstance().value_token,
        cmdComponents[0]
      ),
      this.unlock.bind(this)
    );
  };

  Terminal.prototype.focus = function () {
    this.cmdLine.focus();
  };

  var TypeSimulator = function (timer, output) {
    var t = parseInt(timer);
    if (t === Number.NaN || t < 0) {
      throw new InvalidArgumentException("Invalid value " + t + " for argument 'timer'.");
    }
    if (!(output instanceof Node)) {
      throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
    }
    this.timer = t;
    this.output = output;
  };

  TypeSimulator.prototype.type = function (text, callback) {
    if (isURL(text)) {
      window.open(text);
    }
    var i = 0;
    var output = this.output;
    var timer = this.timer;
    var skipped = false;
    var skip = function () {
      skipped = true;
    }.bind(this);
    document.addEventListener("dblclick", skip);
    (function typer() {
      if (i < text.length) {
        var char = text.charAt(i);
        var isNewLine = char === "\n";
        output.innerHTML += isNewLine ? "<br/>" : char;
        i++;
        if (!skipped) {
          setTimeout(typer, isNewLine ? timer * 2 : timer);
        } else {
          output.innerHTML += (text.substring(i).replace(/\n/g, "<br/>")) + "<br/>";
          document.removeEventListener("dblclick", skip);
          if (callback) callback();
        }
      } else if (callback) {
        output.innerHTML += "<br/>";
        document.removeEventListener("dblclick", skip);
        callback();
      }
      scrollToBottom();
    })();
  };

  return {
    listener: function () {
      new Terminal(
        document.getElementById("prompt"),
        document.getElementById("cmdline"),
        document.getElementById("output"),
        document.getElementById("sidenav"),
        document.getElementById("profilePic"),
        configs.getInstance().user,
        configs.getInstance().host,
        configs.getInstance().is_root,
        configs.getInstance().type_delay
      ).init();
    }
  };
})();

window.onload = main.listener;