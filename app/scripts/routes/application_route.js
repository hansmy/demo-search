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

DSApp.SearchRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('search');
  },
  model: function(urlParams) {
    var queryObj = Dsa.Utils.parseQueryString(urlParams.query);
    // console.log("queryObj", queryObj, queryObj.q, queryObj.sort);

    DSApp.searcher.params.start = 0;
    DSApp.searcher.setQuery(queryObj.q);
    // Em.set('DSApp.searcher.params.sort', queryObj.sort);

    DSApp.searcher.clearFacets();
    if (queryObj.fq) {
      for (var key in queryObj.fq) {
        var facets = queryObj.fq;
        DSApp.searcher.addFacet(key, facets[key]);
      }
      // console.log("Selected Facets ", DSApp.searcher.selectedFacets);
    }

    DSApp.searcher.search();

    return true;
  },
  afterModel: function() {
    $(document).attr('title', 'Search OPENi: ' + DSApp.searcher.searchedFor);
  }
});
