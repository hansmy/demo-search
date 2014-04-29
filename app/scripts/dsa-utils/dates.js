/*******************************************************************************
 * Copyright (c) 2014 AmbieSense Limited.
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
 *******************************************************************************/



// Dates

Dsa.Utils.formatISODate = function (timestamp, format) {
  
  // TODO: Make sure parsed time = original
  var t = timestamp.toString();

  var dd     =  t.slice(8, 10),
      mm     =  t.slice(5, 7),
      yyyy   =  t.slice(0, 4),
      h      =  t.slice(11, 13),
      m      =  t.slice(14, 16),
      s      =  t.slice(17, 19),
      months =  ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  ;

  if (format === 'date') {
    return months[Number(mm) - 1] + ' ' + Number(dd) + ', ' + yyyy;
  }
  else if (format === 'year') {
    return yyyy;
  }
};

$(document).ready(function() {
  // Detect when close to the bottom of the page and load more results 
  $(window).scroll(function(){
    var distanceToBottom = $(document).height() - $(window).scrollTop(),
        windowHeight = $(window).height(),
        allResultsLoaded = DSApp.searcher.get('allResultsLoaded');

    if (!allResultsLoaded && !DSApp.searcher.isSearching && window.location.hash.indexOf("search") > -1 && distanceToBottom < windowHeight + 360 ) {
      DSApp.searcher.loadNextResults();
    }
  });
});