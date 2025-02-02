"use strict";

/**
 * Configs
 */
var configs = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        general_help: "Below there's a list of commands that you can use.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities.",
        ls_help: "List information about the files and folders (the current directory by default).",
        cat_help: "Read FILE(s) content and print it to the standard output (screen).",
        whoami_help: "Print the user name associated with the current effective user ID and more info.",
        date_help: "Print the system date and time.",
        help_help: "Print this menu.",
        clear_help: "Clear the terminal screen.",
        reboot_help: "Reboot the system.",
        cd_help: "Change the current working directory.",
        mv_help: "Move (rename) files.",
        rm_help: "Remove files or directories.",
        rmdir_help: "Remove directory, this command will only work if the folders are empty.",
        touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
        sudo_help: "Execute a command as the superuser.",
        welcome: "Welcome to FTW (Fake Terminal Website)! :)\nIn order for you to start customizing the texts, go to js/main.js and replace the texts located at the configs var.\nIn that same file, you can define all the fake files you want as well as their content. This files will appear on the sidenav.\nAlso, don't forget to change the colors on the css/main.css file as well as the website title on the index.html file.\nNow in order to get started, feel free to either execute the 'help' command or use the more user-friendly colored sidenav at your left.\nIn order to skip text rolling, double click/touch anywhere.",
        internet_explorer_warning: "NOTE: I see you're using internet explorer, this website won't work properly.",
        welcome_file_name: "welcome_message.txt",
        invalid_command_message: "<value>: command not found.",
        reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
        permission_denied_message: "Unable to '<value>', permission denied.",
        sudo_message: "Unable to sudo using a web client.",
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
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

/**
 * Your files here
 */
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
        "getting_started.txt": "First, go to js/main.js and replace all the text on both singleton vars.\n- configs: All the text used on the website.\n- files: All the fake files used on the website. These files are also used to be listed on the sidenav.\nAlso please notice if a file content is a raw URL, when clicked/concatenated it will be opened on a new tab.\nDon't forget also to:\n- Change the page title on the index.html file\n- Change the website color on the css/main.css\n- Change the images located at the img folder. The suggested sizes are 150x150 for the avatar and 32x32/16x16 for the favicon.",
        "contact.txt": "mail@example.com",
        "social_network_1.txt": "https://www.socialite.com/username/",
        "social_network_2.txt": "https://example.com/profile/9382/"
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

var main = (function () {

    /**
     * Aux functions
     */
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

    // Enhanced IP information retrieval function
    var fetchIPInfo = function() {
        return new Promise(function(resolve, reject) {
            // Primary API
            fetch('https://ipapi.co/json/')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('ipapi.co API request failed');
                })
                .then(data => {
                    resolve({
                        ip: data.ip,
                        city: data.city,
                        region: data.region,
                        country: data.country_name,
                        timezone: data.timezone
                    });
                })
                .catch(error1 => {
                    console.error(error1);
                    // Secondary API
                    fetch('https://ipinfo.io/json')
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error('ipinfo.io API request failed');
                        })
                        .then(data => {
                            resolve({
                                ip: data.ip,
                                city: data.city,
                                region: data.region,
                                country: data.country,
                                timezone: data.timezone
                            });
                        })
                        .catch(error2 => {
                            console.error(error2);
                            // JSONP fallback
                            var script = document.createElement('script');
                            script.src = 'https://freeipapi.com/api/json?callback=handleIPData';

                            window.handleIPData = function(data) {
                                resolve({
                                    ip: data.ipAddress,
                                    city: data.cityName,
                                    region: data.regionName,
                                    country: data.countryName,
                                    timezone: data.timeZone
                                });
                                document.body.removeChild(script);
                                delete window.handleIPData;
                            };

                            script.onerror = function() {
                                reject(new Error('All IP retrieval methods failed'));
                                document.body.removeChild(script);
                                delete window.handleIPData;
                            };

                            document.body.appendChild(script);
                        });
                });
        });
    };

    
    /**
     * Model
     */
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
        CAT: { value: "cat", help: configs.getInstance().cat_help },
        WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
        DATE: { value: "date", help: configs.getInstance().date_help },
        HELP: { value: "help", help: configs.getInstance().help_help },
        CLEAR: { value: "clear", help: configs.getInstance().clear_help },
        REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
        CD: { value: "cd", help: configs.getInstance().cd_help },
        MV: { value: "mv", help: configs.getInstance().mv_help },
        RM: { value: "rm", help: configs.getInstance().rm_help },
        RMDIR: { value: "rmdir", help: configs.getInstance().rmdir_help },
        TOUCH: { value: "touch", help: configs.getInstance().touch_help },
        SUDO: { value: "sudo", help: configs.getInstance().sudo_help }
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

    // ... (existing code remains the same up to Terminal.prototype.init)

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

        // Global keydown listener to capture all input
        document.addEventListener('keydown', function(event) {
            if (this.cmdLine.disabled) {
                return; // Terminal is locked, ignore input
            }
            
            const target = event.target;
            // Only process key events if the target is the cmdLine or not an interactive element
            if (target !== this.cmdLine) {
                const excludedTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A'];
                if (excludedTags.includes(target.tagName) || target.isContentEditable) {
                    return; // Allow default behavior for non-cmdLine inputs, buttons, etc.
                }
            }

            event.preventDefault();
            this.cmdLine.focus(); // Ensure cmdLine is focused

            const key = event.key;
            const cmdLine = this.cmdLine;
            let start = cmdLine.selectionStart;
            let end = cmdLine.selectionEnd;
            let value = cmdLine.value;

            switch (key) {
                case 'Enter':
                    this.handleCmd();
                    break;
                case 'Tab':
                    this.handleFill();
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
                    if (key.length === 1) { // Printable character
                        cmdLine.value = value.slice(0, start) + key + value.slice(end);
                        cmdLine.setSelectionRange(start + 1, start + 1);
                    }
                    break;
            }

            scrollToBottom();
        }.bind(this));

        this.reset();
    };

    // ... (rest of the existing code remains the same)

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
                this.cmdLine.value = "cat " + file + " ";
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

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                if (configs.getInstance().welcome_file_name.startsWith(cmdComponents[1].toLowerCase())) {
                    possibilities.push(cmds.CAT.value + " " + configs.getInstance().welcome_file_name);
                }
                for (var file in files.getInstance()) {
                    if (file.startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CAT.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case cmds.CAT.value:
                this.cat(cmdComponents);
                break;
            case cmds.LS.value:
                this.ls();
                break;
            case cmds.WHOAMI.value:
                this.whoami(cmdComponents);
                break;
            case cmds.DATE.value:
                this.date();
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
            case cmds.CD.value:
            case cmds.MV.value:
            case cmds.RMDIR.value:
            case cmds.RM.value:
            case cmds.TOUCH.value:
                this.permissionDenied(cmdComponents);
                break;
            case cmds.SUDO.value:
                this.sudo();
                break;
            default:
                this.invalidCommand(cmdComponents);
                break;
        };
    };

    /**
     * FIXED cat command logic below
     */
    Terminal.prototype.cat = function (cmdComponents) {
        var result;
        if (cmdComponents.length <= 1) {
            result = configs.getInstance().usage + ": " + cmds.CAT.value + " <" + configs.getInstance().file + ">";
        } 
        // Check if the file is NEITHER the welcome_message.txt NOR in the files object
        else if (
            !cmdComponents[1] ||
            (cmdComponents[1] !== configs.getInstance().welcome_file_name &&
             !files.getInstance().hasOwnProperty(cmdComponents[1]))
        ) {
            result = configs.getInstance().file_not_found.replace(
                configs.getInstance().value_token,
                cmdComponents[1]
            );
        } else {
            // If it's the welcome_file_name, show the welcome text; otherwise, show the file content.
            result = cmdComponents[1] === configs.getInstance().welcome_file_name
                ? configs.getInstance().welcome
                : files.getInstance()[cmdComponents[1]];
        }
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.ls = function () {
        var result = ".\n..\n" + configs.getInstance().welcome_file_name + "\n";
        for (var file in files.getInstance()) {
            result += file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    };

    Terminal.prototype.whoami = function (cmdComponents) {
        var self = this;
        fetchIPInfo()
            .then(function(ipData) {
                var os = getOS();
                var browser = getBrowser();
                var screenRes = window.screen.width + 'x' + window.screen.height;
                var timezone = ipData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
                var locationParts = [];
                if (ipData.city) locationParts.push(ipData.city);
                if (ipData.region) locationParts.push(ipData.region);
                if (ipData.country) locationParts.push(ipData.country);
                var location = locationParts.join(', ') || 'Unknown location';

                var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" +
                    configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" +
                    "IP Address: " + (ipData.ip || 'Unknown') + "\n" +
                    "Location: " + location + "\n" +
                    "Timezone: " + timezone + "\n" +
                    "OS: " + os + "\n" +
                    "Browser: " + browser + "\n" +
                    "Screen Resolution: " + screenRes + "\n" +
                    configs.getInstance().platform + ": " + navigator.platform + "\n" +
                    configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" +
                    configs.getInstance().language + ": " + navigator.language;

                self.type(result, self.unlock.bind(self));
            })
            .catch(function(error) {
                console.error("Error fetching IP info:", error);
                var os = getOS();
                var browser = getBrowser();
                var screenRes = window.screen.width + 'x' + window.screen.height;
                var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" +
                    configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" +
                    "IP Address: Unable to retrieve\n" +
                    "Location: Unknown (IP fetch failed)\n" +
                    "Timezone: " + timezone + "\n" +
                    "OS: " + os + "\n" +
                    "Browser: " + browser + "\n" +
                    "Screen Resolution: " + screenRes + "\n" +
                    configs.getInstance().platform + ": " + navigator.platform + "\n" +
                    configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" +
                    configs.getInstance().language + ": " + navigator.language;

                self.type(result, self.unlock.bind(self));
            });
    };

    Terminal.prototype.date = function (cmdComponents) {
        this.type(new Date().toString(), this.unlock.bind(this));
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
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(
                configs.getInstance().welcome +
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
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
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
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
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