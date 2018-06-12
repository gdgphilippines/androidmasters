/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["entries.html","5ce111a2f63b2f7fde95c980b2dfdf40"],["includes/fonts/materialdesignicons-webfont.eot","d5247f90f15e16a67b0bc907bbf34b41"],["includes/fonts/materialdesignicons-webfont.svg","b4c3e19fb97f248b748751f092bacc7d"],["includes/fonts/materialdesignicons-webfont.ttf","3daf0eaec12778787d91f136f84bbf72"],["includes/fonts/materialdesignicons-webfont.woff","6f612b80df1b95abf7ca72717f8659d4"],["includes/fonts/materialdesignicons-webfont.woff2","85f0bd26d0491015858074f6dfa2f33e"],["includes/images/android_app.png","80b89ab6dc5e02cd26c46cc49d009df2"],["includes/images/apps/239.png","2d3543a3ef294e50f1877e6c19fd9e5f"],["includes/images/apps/ArchaeocetiVR.png","7eb69b6d38fb5813e62a54f50f050ce3"],["includes/images/apps/Bagel Rush.png","e7b45cc4bed393feb9cee5f2a34d3152"],["includes/images/apps/Body Fight.png","5b97ff0c70861350b9fb60e246a592ac"],["includes/images/apps/BorroWise.png","a214a4dfbb26244344be67ff29716d81"],["includes/images/apps/Daruma.png","8ac727467983f23bc7480c256dfcef06"],["includes/images/apps/Defense of the Oiland.png","2e6706095f6ab30bef999138f8c689b7"],["includes/images/apps/DropLett.png","7381b3faa965cc452e8ca90a1d8c79e3"],["includes/images/apps/E-RX.png","805cf2ee3a77feceb8926b9b0f937dd0"],["includes/images/apps/Elemental Dash.png","af3ca0025d9f77cc6f7d2ba364a1eedb"],["includes/images/apps/Farmer Helper.png","3539423aa1ab0d8a6a01c30e4caf74d1"],["includes/images/apps/Geito.png","d087905404f0e77d181c9c43a4ec37fe"],["includes/images/apps/Gigantopus(Destructopus).png","7213f9e9937195cf06f1a36f4d2424c8"],["includes/images/apps/History Wars.png","ca51d7b162e454d2d25e61e8082b70ae"],["includes/images/apps/InstaMath.png","f49c68837c7b00144c973725111ab6dd"],["includes/images/apps/Kalmamity.png","f71aac78e953e14eb5c76bd0f3e4c6e3"],["includes/images/apps/Lights Out.png","a92cbf8855068089d780071ff5e16b81"],["includes/images/apps/Little Chambers.png","5a68606d39ac84ee53bc9e72ec3cbffa"],["includes/images/apps/Loot.png","0b690dbb2832f7bbb22f478f69725d6c"],["includes/images/apps/M.A.R.C (Multiple Appliances Remote Controller).png","f09e052932872a4b82cca1c342ead48a"],["includes/images/apps/Mystical Maze.png","b61f8a1aadc2856bc094ce81fbf1d9c1"],["includes/images/apps/NutriVision.png","4938aba6b2494d0eea18c978a1778e78"],["includes/images/apps/Oppah.png","4f32512e802c03d2b11e44326218a99a"],["includes/images/apps/Orb Defender.png","1e36859ea79d944dbc2eede20045392c"],["includes/images/apps/OrbitEarth.png","7f03c34d001a4c971c5ac0a65954664b"],["includes/images/apps/Palengkero.png","287b2624f8f1cbac4b1d75526a5ac0c4"],["includes/images/apps/Phonetact.png","3ea3e88ae01dc2fc6b2f4cd3889f787f"],["includes/images/apps/RSA-RemoteSolutionApplication.png","3968be35b75810c0c2f3cb802f4382f2"],["includes/images/apps/RoadWiZ.png","21a56fd121bbc1d954a5e630b8ad48d7"],["includes/images/apps/Specters VR.png","3780ef21d8586372a7f60107be7c2c88"],["includes/images/apps/Tap Tap Eat.png","954f804b6e71793c0de136593f45aca8"],["includes/images/apps/Travel Buddy.png","fffaec9df2b38ac5f77643a35c5c06ec"],["includes/images/apps/Whibble.png","99e0fa952720d928b2db0e5b8ff4aa7e"],["includes/images/apps/Windmill1.png","72a8a67211550ba87216bb1b97bbcd2e"],["includes/images/apps/World of Phantasm (WoP).png","85f1e9a82ca54a49c010edadf8a3e2fd"],["includes/images/apps/beSafe.png","107350a2f961a80acecee180609ff0a7"],["includes/images/apps/iFlexBuddy.png","85185ac194219b4c776809cd9479405d"],["includes/images/apps/medical.ly.png","2ca6748132f41117e5a58cb5b62b9a08"],["includes/images/bg-2.jpg","c46b331d521613eb508f3a4577ff294b"],["includes/images/cash-multiple.png","7970fb2f6fd9ac3b143669fe992f73d9"],["includes/images/champion-game.jpg","2c1b4069d7e920a0d734c05d547ac087"],["includes/images/champion-utility-productivity.jpg","f1b1de88de117a9c28db1597b7a980cb"],["includes/images/company/altitude.png","231be66680adcb9e0d899d8fdf4b20c9"],["includes/images/company/globelabs.png","a899bab119dd56c0352f88bd604b7110"],["includes/images/company/jumpsparc.png","a1b1b9c8dae883ae9a20b3a17d782a03"],["includes/images/company/kickstart.png","92aadc1892a3f92965f38bdd2145945d"],["includes/images/company/klab-cyscorpions.png","b41c39c594f655bcf2f4908696540418"],["includes/images/company/mochibits.png","c19c1cebe8cd3574be4972e9acfddd36"],["includes/images/company/playlab.png","1770eb200761303e86268ec9dca2fc4d"],["includes/images/download.png","d4205e497ae68330fd443d66c79c93d1"],["includes/images/facebook.png","719021f8d057b1e3e81dc57c76ea3817"],["includes/images/favicon/android-chrome-192x192.png","638c83279e38e3d9058efc4c4853af59"],["includes/images/favicon/android-chrome-512x512.png","023b990c0154c8492356c568edf72646"],["includes/images/favicon/apple-touch-icon.png","6774d93dd580a1b10d8590a3fb8809c3"],["includes/images/favicon/browserconfig.xml","13275c611c088653632243d4980d0857"],["includes/images/favicon/favicon-16x16.png","3824330a8ea4220f0413323192bda7c0"],["includes/images/favicon/favicon-32x32.png","f3ea2dd1250d893986a92076be6cf4de"],["includes/images/favicon/favicon.ico","53011e9b171aa5537b1353518abb9d09"],["includes/images/favicon/manifest.json","026c6046deb642e9389f831e84898b8a"],["includes/images/favicon/mstile-150x150.png","2b18e0b92da9c9bc0e090fbf9277932a"],["includes/images/favicon/safari-pinned-tab.svg","bd8fdb4742191ccb50bfe9612b18d987"],["includes/images/games.png","57058bb389af9b779bd7668ac12ef410"],["includes/images/gdgph.png","4c9b4b0138e89cb4d000b12aa218bfd0"],["includes/images/google-plus.png","b76e9590c69890da3ed81a46620089bb"],["includes/images/judges/Alex Alabiso.jpg","05c4f73ef1e58ed25bcc4a9a2acee8eb"],["includes/images/judges/Allan Tan.jpg","ac1e78d7422ed89a4ccef70fb3e130d6"],["includes/images/judges/Anne Michelle Santos.jpg","8dd5eeec9a8ecd3ba2876008e11ce3d5"],["includes/images/judges/Derrick Alain Mapagu.jpg","f706fd5f5a67b8bf2b57bfdc5d04abc3"],["includes/images/judges/Dexter Santos.jpg","6849654f07c74a80c841666bec80901a"],["includes/images/judges/Elymar Apao.jpg","685e9c4cb65683dfeafa5c7bba1c5cbf"],["includes/images/judges/Howard Go.jpg","2a09060957c3393230990a15a1a67ca3"],["includes/images/judges/Jennifer Faigmani.jpg","a65d529f664a87f9368cb2dd1a9bd8f4"],["includes/images/judges/Johnny Benitez.jpg","ba116a172709c2ee0ef94bfac04c1a56"],["includes/images/judges/Neil Patrick Del Gallego.jpg","104f89cc7d9b8f6e2d4bc9c0b133625d"],["includes/images/judges/Paul Gadi.jpg","e690f3126536cfa7b2697e0600db4f16"],["includes/images/judges/unknown.png","65d30a84020badbbf66e5eef4fe2167e"],["includes/images/logo-large.png","1be8cf3aba5b4b79dead64974e8b1b41"],["includes/images/logo-xsmall.png","60e4aa2c544074c0f3cb766be709806e"],["includes/images/logow-large.png","a9c3d1f22060509c9ea6af0582210903"],["includes/images/sponsors/accenture.png","22da65f0d0d8ddd4810b8a08fa1492e6"],["includes/images/sponsors/eclaro.png","fbf5b6e71b09f09a872d6f7a64a8b28a"],["includes/images/sponsors/eclaro_white.png","0358e3f1cf61e0b2afe7b60e6928b22f"],["includes/images/sponsors/glutaphos.png","52d6c0103a38586a9c1fbbd53ad149ed"],["includes/images/sponsors/hawk.png","196afc23642b20c03b97c4d4155ba656"],["includes/images/sponsors/inquirernet.png","1627a6a145e4c9ebeaa33ef7cccfb189"],["includes/images/sponsors/kai.png","61e6d3d6025b910afaf4c6289eb8b0a8"],["includes/images/sponsors/klab-cyscorpions.png","5cea40cdc26399c6d08a62231a6d00c9"],["includes/images/sponsors/philstar.png","fc37df8b383c7b6894a82f19ddb15c66"],["includes/images/sponsors/quaker.png","22ddc58e428549264acaff06a2fd35ca"],["includes/images/sponsors/teradoor.png","3cc214c28e7277618d9b6fd8b5796ab0"],["includes/images/sponsors/when-in-manila.png","d07b2411ebf9f4307a75d8980966b3ff"],["includes/images/sponsors/zcom.png","65a532257b5cc30aec8782abccd36a80"],["includes/images/sponsors/zott.png","8ecf05427e70f502a1f2cf852512c9b2"],["includes/images/stage.jpg","a4fdcf8c6e9f29c3d0cc25c0035fca91"],["includes/images/twitter.png","5fc510d1a6cac19f711053ce5477e30e"],["includes/images/utility.png","8c25110bd3ed6038cf6cec31701e4102"],["includes/images/winners/game.jpg","52a4dc4e69bc08f75bf085ec4ce3d67e"],["includes/images/winners/mostdownloaded.jpg","0a15242e93f9a362972cf48cabee5615"],["includes/images/winners/peopleschoice.jpg","142af626a324f3539ff7ce67470de44c"],["includes/images/winners/utility.jpg","67d3754b09cf4be34f191253c2ab8d51"],["includes/images/winners/wtm.jpg","d903c9428e70fa7a5b9f719c19f0af2a"],["includes/images/wtm.png","9b2e641b2fc5d37edc1b0419b4d61329"],["includes/scripts/jquery.min.js","5a104e61f58b01d7f465895e5e283127"],["includes/scripts/jquery.reel.js","96e1c92d9d772dd9d21b230ee217e645"],["includes/scripts/script.js","f5be76b9fb2c88e6dcf223effa2da948"],["includes/scripts/smooth_scroll.js","b9d91d53f47b1d883c7848853355e733"],["includes/styles/jquery-ui.css","8f313001a36df4b85d2d1908020292f2"],["includes/styles/jquery-ui.css.map","770ea09e3a38a92da2ed28beaa84f673"],["includes/styles/jquery-ui.scss","2c077850d2a53b5cc41a4b2a5ed23e95"],["includes/styles/m.css","44b782a77270451d93bf300426e43701"],["includes/styles/m.css.map","30ec959c1336f75a3f7a2ba1b5f3be85"],["includes/styles/m.scss","7459b50480f93f882726d97b9c7ca7a8"],["includes/styles/mdi.css","7e98d387ba2967fc8b5526ce7026aaab"],["includes/styles/mdi.css.map","b70784557743112d0d7301faeb961c7d"],["includes/styles/mdi.scss","e0f6eb1775ad761f537227d3d6e12c62"],["includes/styles/style.css","7edde76d4e43be98354a6dec56630197"],["includes/styles/style.css.map","43b15e7a4eed0776df0fceaa27942804"],["includes/styles/style.scss","8d9d30c2b06dc544e7411433595fa384"],["includes/styles/variables.css","331ee7f9537a210e457433418f23f584"],["includes/styles/variables.css.map","f88fbab8b49f70dc0e410ecf75e2b4c5"],["includes/styles/variables.scss","f7819bcd7d7fff710e40c908f15db49b"],["index.html","1b0e7362adc2485177f52061a7bae6ef"],["manifest.json","e50e6a1c9ed6452635d3211f39501e0d"],["vote/App.js","e1fd0584db6f4ef35e26da954f24d54e"],["vote/count.html","8c48be70250afd8ad98c1bb762419b49"],["vote/index.html","3ca1a406fffbd7e8776bb591620326aa"],["vote/raffle.html","0f968a93421e4944890b87f08aa02c06"],["vote/style.css","b28b67f58c57b93bf96c94f79c123220"],["vote/style.css.map","29cfecb42e2d88da62858160d828a388"],["vote/style.scss","624d4b7d5afb28bb7bf907a0e8cac3d1"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







