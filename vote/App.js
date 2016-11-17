var App = {
	ready: function() {
		firebase.initializeApp(App.Firebase.config);
		this.Firebase.init();
		$(document).on("click", "[data-name]", function() {
			if(!App.User.voted) {
				$("[data-category] .card").removeClass("selected");
				$(this).addClass("selected");
			}
		})
		$(document).on("click", "a.submit", function() {
			if(!App.User.voted) {
				var selected = $(".vote-content .card.selected").attr("data-name");
				if(!(selected == null)) {
					App.User.voted = true;
					App.Firebase.database.ref("users/"+App.User.loggedUser.uid).update({
						"vote": selected
					});
					$("span.error_message").html("Thank you for voting!").show();
					$("a.submit").remove();
				} else
					$("span.error_message").css("display", "block");
			}
		})
	},
	Count: {
		ready: function() {
			$(document).on("click", "a.show", function() {
				// function showAnimate(n) {
				// 	$("[data-category] .card:nth-child("+n+")").find("img, .app, .team").animate({
				// 		"opacity": "1"
				// 	}, 2000, function() {
				// 		if(n > 1)
				// 			showAnimate(n-1);
				// 	});
				// }
				// showAnimate(6);
				$(".card").find("img, .app, .team").css("opacity", "1");
			});
			firebase.initializeApp(App.Firebase.config);
			firebase.database().ref("users").on("value", function(data) {
				$("[data-category] a.card").remove();
				var score = {};
				App.Finalists.list.forEach(function(entry) {
					score[entry.name] = 0;
				});
				var total = 0;
				for(var user in data.val()) {
					var vote = data.val()[user].vote;
					console.log(vote);
					if(vote != null) {
						score[vote]++;
						total++;
					}
				}
				// if(data.child("game").exists()) {
				// 	App.User.voted = true;
				// 	$(".vote-content p").html("You have already voted.");
				// } else {
				// 	$(".vote-content p").html("Select an app for each category and click Submit at the bottom of this page to vote.");
				// 	$(".submit").css("display", "inline-block");
				// }


				function sortApps(apps) {
					var temp = [];
					for(var i in apps)
						temp.push(i);
					temp.reverse();
					var final = [];
					for(var i = 0; i < temp.length; i++) {
						var highest = 0;
						console.log(temp[i] + " " + apps[temp[i]]);
						for(var j = 0; j < temp.length; j++) {
							console.log("\t"+temp[j]+" " + apps[temp[j]]);
							if(apps[temp[j]] >= apps[temp[highest]])
								highest = j;
						}
						i--;
						final.push(temp[highest]);
						temp.splice(highest,1);
					}
					return final;
				}
				function getAppDetail(appname, key) {
					var x = "";
					App.Finalists.list.forEach(function(entry) {
						if(appname == entry.name)
							x = entry[key];
					})
					return x;
				}
				console.log(score);
				var appsOrdered = sortApps(score);
				console.log(appsOrdered);
				var i = 0;
				appsOrdered.forEach(function(entry) {
					console.log(entry)
					var container = "[data-column=1]";
					var divisor = total;
					if(i > 4)
						container = "[data-column=2]";
					if(divisor == 0)
						divisor = 1;
					$(container).append('<a data-name="'+entry+'" class="card"><span class="rank-number">'+(i+1)+'</span><img src="../includes/images/apps/'+entry+'.png" width="48px"><span class="app">'+entry+'</span><span class="team">'+getAppDetail(entry, "team")+'</span><span class="score">'+((score[entry]/divisor)*100).toFixed(2)+'%</span></a>');
					i++;
				});
				$(".card").find("img, .app, .team").css("opacity", "0");
			})
		}
	},
	User: {
		loggedUser: null,
		voted: false,
		register: function(user) {
			App.Firebase.database.ref("users/"+user.uid).once("value", function(data) {
				if(!data.child("displayName").exists()) {
					App.Firebase.database.ref("users/"+user.uid).set({
						displayName: user.displayName,
					});	
				}
			});
		}
	},
	Firebase: {
		config: {
			apiKey: "AIzaSyBuz06TKjTBNkO5UPDxyVaujfc-f4g2bNw",
			authDomain: "android-masters-vote.firebaseapp.com",
			databaseURL: "https://android-masters-vote.firebaseio.com",
			storageBucket: "android-masters-vote.appspot.com",
			messagingSenderId: "368116971670"
		},
		init: function() {
			this.auth = firebase.auth();
			this.database = firebase.database();
			this.storage = firebase.storage();
			this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
			$(".login").click(function() {
				var provider = new firebase.auth.GoogleAuthProvider();
				App.Firebase.auth.signInWithPopup(provider);
			});
			$(".logout").click(function() {
				App.Firebase.auth.signOut();
			});
		},
		onAuthStateChanged: function(user) {
			App.User.loggedUser = user;
			if(user) {
				$("span.message").html('Hello <img src="'+user.photoURL+'" class="userpic">'+ user.displayName+'!')
				$("a.logout").show();
				$("a.login").hide();
				$(".vote-content").show();
				App.Finalists.load();
				App.User.register(user);
			} else {
				$("span.message").html('Please login in order to vote.')
				$("a.logout").hide();
				$("a.login").show();
				$(".vote-content").hide();
			}
		}
	},
	Finalists: {
		load: function() {
			$("[data-category] a.card").remove("");
			App.Firebase.database.ref("users/"+App.User.loggedUser.uid).once("value", function(data) {
				if(data.child("game").exists()) {
					App.User.voted = true;
					$(".vote-content p").html("You have already voted.");
				} else {
					$(".vote-content p").html("Select only <b>one</b> app you think is the best!");
					$(".submit").css("display", "inline-block");
				}
				App.Finalists.list.forEach(function(entry) {
					var container = "[data-category=utility]";
					if(entry.category == "Games")
						container = "[data-category=game]"
					var selected = "";
					if(entry.name == data.val().game || entry.name == data.val().utility) 
						selected = " selected";
					$(container).append('<a data-name="'+entry.name+'" class="card'+ selected +'"><img src="../includes/images/apps/'+entry.name+'.png" width="48px"><span class="app">'+entry.name+'</span><span class="team">'+entry.team+'</span></a>');
				});
			});
		},
		loadScore: function() {
			App.Firebase.database.ref("users").on("value", function(data) {
				var score = {};
				App.Finalists.list.forEach(function(entry) {
					score[entry.name] = 0;
				})
				var gameTotal = 0;
				var utilityTotal = 0;
				for(var user in data.val()) {
					var game = data.val()[user].game;
					var utility = data.val()[user].utility;
					score[game]++;
					score[utility]++;
					gameTotal++;
					utilityTotal++;
				}
				$("span.team").show();
				$("[data-name]").each(function() {
					var appname = $(this).attr("data-name");
					var divisor = utilityTotal;
					if($(this).parents("[data-category]").attr("data-category") == "game")
						divisor = gameTotal;
					if($(this).children("span.score").length == 0)
						$(this).append('<span class="score">'+((score[appname]/divisor)*100).toFixed(2)+'%</span>')
					else
						$(this).find("span.score").html(((score[appname]/divisor)*100).toFixed(2)+'%')
				})
			})
		},
		list: [
			{"team": "Team Supremo", "name": "239", "link": "https://play.google.com/store/apps/details?id=com.TeamSupremo.TwoThreeNine", "category": "Games", "desc": "A minimalist math arcade game  will challenge your mind under time pressure! Tap into this fast-paced game by Team Supremo.", "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879118242220108/?type=3&theater"},
			{"team": "Team Astra", "name": "Body Fight", "link": "https://play.google.com/store/apps/details?id=cruz.pasia.magtibay&hl=en", "category": "Games", "desc": 'Healthy living certainly isn’t an iron shield that guarantee against developing CANCER. But in the same way that wearing a helmet and sticking to the road policy are behaviors that reduce your chances of being hurt or killed in a vehicle crash, leading a healthy lifestyle by not smoking and keeping active is about loading the odds in your favor, in some cases very meaningfully. ', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879118698886729/?type=3&theater"},
			{"team": "Under Repair", "name": "Daruma", "link": "https://play.google.com/store/apps/details?id=com.UnderRepair.Daruma&hl=en", "category": "Games", "desc": 'Daruma is a fast-paced action game that boosts spatial skills.<br>It is a fun tilting game that gets harder each time a maze is completed.<br>A wonderful game to spend your casual time with<br>The Goal of the game is to reach the end of a maze to advance to another maze.<br>The mazes gets harder and presents more challenges the more mazes you finish. The game gives you a limited amount of time to solve the mazes. There are gems that can be picked up. The gems either give you more time or turns the light off.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879119008886698/?type=3&theater"},
			{"team": "JaguarTech Almiwouch", "name": "E-RX", "link": "https://play.google.com/store/apps/details?id=com.almiwouch.erx", "category": "Utility / Productivity", "desc": 'E-RX is a mobile app that enables doctors and other physicians to send prescription to participating pharmacies using a secured path instead of the traditional way of handwritten prescription which will improve prescription accuracy and legibility, increase patient safety and reduce prescription fabrication.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879119408886658/?type=3&theater"},
			{"team": "DMC_WOLVES", "name": "History Wars", "link": "https://play.google.com/store/apps/details?id=com.MPossibleGames.HistoryWars", "category": "Games", "desc": 'Tap \'n\' slash as many invaders as you can using your hero\'s weapon and survive the invasion! Prove you’re a true HERO!', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879120145553251/?type=3&theater"},
			{"team": "Team iFlex", "name": "iFlexBuddy", "link": "https://play.google.com/store/apps/details?id=com.iflexbuddy.christianalex.iflexbuddy", "category": "Utility / Productivity", "desc": 'iFlexBuddy is an app for gymgoers who are having problems using Gym equipments. Bringing a gym instructor right at their fingertips. The app provides video tutorials on how to use them, proper execution, and basic instructions to help gymgoers with their struggle inside the gym. It also provides scheduled workout with corresponding tutorial given by a gym instructor.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879120165553249/?type=3&theater"},
			{"team": "Hala Napundi", "name": "Lights Out", "link": "https://play.google.com/store/apps/details?id=com.koalition.edu.lightsout", "category": "Games", "desc": 'Lights Out is a challenging memory game that encourages people to save money by turning off the lights.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879120825553183/?type=3&theater"},
			{"team": "Big T", "name": "Loot", "link": "https://play.google.com/store/apps/details?id=tapales.manto.bhuller.loot", "category": "Utility / Productivity", "desc": 'Loot is not your ordinary expense tracker. Aside from keeping track of your expenses and savings, Loot can also reward you for your actions. Think of it more like a game, the more you play, the better you get! In this case, the more money you save! Loot is dead simple to use with its clean and simple interface.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879121898886409/?type=3&theater"},
			{"team": "El Verde Trio", "name": "medical.ly", "link": "https://play.google.com/store/apps/details?id=edu.usls.coronelgensola.project", "category": "Utility / Productivity", "desc": 'The primary purpose of the app is to remind the user when to take his prescribed medication. People tend to forget when to take their medication and it is usually common among adults. The app also lets the user store his medical information that can be used in times of emergencies.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879122305553035/?type=3&theater"},
			{"team": "UCU Knight Coders", "name": "NutriVision", "link": "https://play.google.com/store/apps/details?id=edu.ucuccs.nutrivision", "category": "Utility / Productivity", "desc": 'A simple food-photo nutrient analysis application. The app is simple to use. ALl you have to do is to capture or select a photo of foods from your gallery and show you the possible contents of the photo and it will return nutrition facts of these contents.', "fb": "https://www.facebook.com/gdgphilippines/photos/ms.c.eJw90dsVxCAIBNCO9gwgr~;4bW0HI582IGTU86aRBVSHQX1xT8GFmEGJtz7aWiDD3XW~;cls0t25xjR83D~_DmByu~_qMWXnJGN~_uW9~_nnVt1pbdz~_48ZdrOB3VO3r7Nzz2fsNLa2ifX~_Wzjiq~_BcXCZQtZ9PsXM0~;NZM6H6OPNY6n4F8u7r9uh~_iOlnqH58C6~;15po5~;7P0NiYP1Lx6~_lpq~;sz98q1b~;ydsrlGGn3G~;N595bw7n3o~;n~;PXp2uJz74e9z~_z3V5v357TuazJ903t~;zs1dn~;EH4kR~;~;g~-~-.bps.a.879117815553484.1073741868.186397268158879/879126045552661/?type=3&theater"}
		]
	}
}