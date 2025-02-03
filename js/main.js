"use strict";

function showMobileWarning() {
  window.addEventListener("DOMContentLoaded", () => {
    const newBody = document.createElement("body");

    newBody.innerHTML = `
      <div class="warning-container">
        <h2>This website is not optimized for mobile devices.</h2>
        <p>Please access it using a desktop computer for the intended experience.</p>
      </div>
    `;

    newBody.classList.add("warning-body");

    document.documentElement.replaceChild(newBody, document.body);

    const scripts = document.querySelectorAll("script");
    scripts.forEach(script => script.remove());
  });
}

if (/Mobi|Android/i.test(navigator.userAgent)) {
  showMobileWarning();
}

const style = document.createElement("style");
style.innerHTML = `
  .warning-body {
    background-color: #000;
    color: #0f0;
    font-family: monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .warning-container {
    text-align: center;
    padding: 20px;
    border: 2px solid #0f0;
    border-radius: 5px;
  }
`;
document.head.appendChild(style);

var configs = (function () {
  var instance;
  var Singleton = function (options) {
    var options = options || Singleton.defaultOptions;
    for (var key in Singleton.defaultOptions) {
      this[key] = options[key] || Singleton.defaultOptions[key];
    }
  };
  Singleton.defaultOptions = {
    general_help: "The following commands are available for use. Each command is followed by a brief description of its function.",
    ls_help: "This command shows you all the available files and folders in the current directory.",
    open_help: "Opens and displays the contents of a specified file. Usage: open <file> (replace <file> with the exact file name, e.g., 'about.txt').",
    whoami_help: "Provides detailed information about your current profile and system.",
    help_help: "Displays this help text. Use this command any time you need a reminder of the available commands.",
    clear_help: "Clears the terminal screen, removing all previous commands and outputs to provide a fresh view.",
    reboot_help: "Restarts the system, reinitializing the terminal environment to its initial state.",
    internet_explorer_warning: "NOTE: I see you're using Internet Explorer, this website won't work properly.",
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
    "intro.txt": "Welcome! This site uses a terminal-like interface for a unique experience. It's built entirely with JavaScript. For those new to terminals, type 'help' for a command list, 'ls' to see available files, and 'open [filename]' to view a file's contents (e.g., 'open contact.txt').\n\nTips for Using the Side Navigation:\n\n*   Click the '☰' icon on the top left to open the side navigation menu.\n*   Once open, you'll see a list of available files.\n*   Click any file name in the side navigation to automatically type the 'open' command for that file in the terminal.\n*   Need help with commands? Type 'help' in the terminal.\n\nEnjoy exploring!",
	"about_me.txt": "'Career' might be a generous term. Let's call it a sustained endeavor in effort-avoidance. It all began in high school chemistry with the dreaded titration curves. Not the chemistry itself, mind you, but the painstaking task of drawing them by hand. Even for high school, it felt needlessly laborious. Naturally predisposed to efficiency (read: laziness), I sought a shortcut. Enter Excel, the unlikely hero. Suddenly, curves materialized as if by magic. And then… a flicker of something unexpected: positive feedback. The teachers were mildly impressed, while my classmates primarily wanted me to generate their curves, too. Still, that small taste of recognition for efficiency, born from sheer laziness, was surprisingly addictive. I continued automating other lab tasks, fueled by this newfound appreciation. A detour through a sociology degree followed – a story for another time – but eventually, my path circled back. Now, I'm here, streamlining processes for fellow shortcut enthusiasts. Essentially, I help people achieve peak efficiency with minimal effort. It's a dream job, wouldn't you agree? And it all started because I couldn't be bothered to draw a few lines in chemistry class.",
    "cv.url": "https://raw.githubusercontent.com/germabyte/cv/main/output/cv.pdf",
    "concordatofacile.txt": "With my background in both real estate and IT consulting, I noticed a recurring challenge in managing rent-controlled lease agreements in Naples and the Campania region. This led me to develop ConcordatoFacile, a cloud-based solution tailored for associations representing landlords and tenants. The aim is to simplify and improve the process of creating and managing these often-complex agreements.\n\nConcordatoFacile acts as a digital facilitator. It provides associations with access to robust, industry-standard digital tools without requiring them to have in-depth technical knowledge.\n\nHere's a summary of its functionality:\n\n*   Automation is a key focus: It handles calculations for rent based on local regulations and property specifics, generates required documents, and issues deadline reminders.\n*   Emphasis on usability: Associations can collect necessary information through straightforward online forms, and the system provides step-by-step guidance. It also supports digital lease signing.\n*   AI support for complex cases: For unique lease requirements, there is an integrated AI feature, referred to as 'Assistente', that assists in customizing the agreement while maintaining compliance.\n*   Prioritizing security: Sensitive data is handled with the utmost care. ConcordatoFacile leverages leading cloud providers known for high security standards, ensuring data encryption, GDPR compliance, and secure storage.\n*   Efficiency and accuracy: The platform is designed to minimize manual work, reduce paperwork, and improve the speed and precision with which associations can assist their members.\n\nConcordatoFacile is intended as a practical tool for associations. I provide ongoing support and actively work to refine the system based on user feedback.\n\nThe objective of ConcordatoFacile is to help associations enhance their service delivery, improve operational efficiency, and adapt to evolving needs. It aims to streamline their work, allowing them to concentrate on their core mission of representing their members.\n\nIf you'd like to learn more, please visit: www.concordatofacile.it",
	"contact.txt": "Email: germ.riccio@gmail.com\n Phone number: (+39)3313815525",
	"acknowledgements.txt": "This website's terminal-like interface was inspired by and built upon the foundational work of Luis Bragança's project. Without his innovative approach and dedication to creating a unique web experience, this site wouldn't have been possible. You can find the original project here: https://github.com/luisbraganca/fake-terminal-website",
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
    document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
  };

  Terminal.prototype.handleSidenav = function (event) {
    if (this.sidenavOpen) {
      this.profilePic.style.opacity = 0;
      this.sidenavElements.forEach(Terminal.makeElementDisappear);
      this.sidenav.style.width = "50px";
      document.getElementById("sidenavBtn").innerHTML = "☰";
      this.sidenavOpen = false;
    } else {
      this.sidenav.style.width = "300px";
      this.sidenavElements.forEach(Terminal.makeElementAppear);
      document.getElementById("sidenavBtn").innerHTML = "×";
      this.profilePic.style.opacity = 1;
      this.sidenavOpen = true;
    }
    document.getElementById("sidenavBtn").blur();
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
      !files.getInstance().hasOwnProperty(cmdComponents[1])
    ) {
      result = configs.getInstance().file_not_found.replace(
        configs.getInstance().value_token,
        cmdComponents[1]
      );
    } else {
      result = files.getInstance()[cmdComponents[1]];
    }
    this.type(result, this.unlock.bind(this));
  };

  Terminal.prototype.ls = function () {
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
      var rebootMsg = "Rebooting";
      var rebootLine = null;
      var countdown = 3;

      var updateOutput = function (output, message, currentDot, count) {
        if (!rebootLine) {
          output.innerHTML += message + " in " + count + "s " + currentDot + "<br/>";
          rebootLine = output.lastChild;
        } else {
          rebootLine.previousSibling.textContent = message + " in " + count + "s " + currentDot;
        }
        scrollToBottom();
      };

      var rebootInterval = setInterval(function () {
        updateOutput(this.output, rebootMsg, dots[dotIndex], countdown);
        dotIndex = (dotIndex + 1) % dots.length;

        if (dotIndex === 0) {
          countdown--;
        }

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
      this.type(
        files.getInstance()["intro.txt"] +
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
    var output = this.output;
    var timer = this.timer;
    // If the text is a URL, simulate typing inside an anchor element
    if (isURL(text)) {
      var link = document.createElement("a");
      link.href = text.startsWith("http") ? text : "http://" + text;
      link.target = "_blank";
      link.style.color = "#00ffff";
      link.style.textDecoration = "underline";
      output.appendChild(link);
      
      var i = 0;
      var skipped = false;
      var skip = function () {
        skipped = true;
      };
      document.addEventListener("dblclick", skip);
      (function typer() {
        if (i < text.length) {
          link.textContent += text.charAt(i);
          i++;
          if (!skipped) {
            setTimeout(typer, timer);
          } else {
            link.textContent += text.substring(i);
            document.removeEventListener("dblclick", skip);
            if (callback) callback();
          }
          scrollToBottom();
        } else {
          document.removeEventListener("dblclick", skip);
          output.innerHTML += "<br/>";
          if (callback) callback();
          scrollToBottom();
        }
      })();
    } else {
      var i = 0;
      var skipped = false;
      var skip = function () {
        skipped = true;
      };
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
          scrollToBottom();
        } else if (callback) {
          output.innerHTML += "<br/>";
          document.removeEventListener("dblclick", skip);
          callback();
          scrollToBottom();
        }
      })();
    }
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