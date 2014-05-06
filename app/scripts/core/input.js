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
/*
  SEARCH INPUT
  ==============================
*/

Dsa.SearchBox = Ember.TextField.extend({
  placeholder: "Search and discover your personal information ...",
  name: 'searchInput',
  expanded: false,
  classNames: ['dsa-input'],
  didInsertElement: function () {
    if (this.searcher.searchedFor) {
      this.set('value', this.searcher.searchedFor);
      // this.evaluateHeight();
    }
  },
  update: function () {
    this.set('value', this.searcher.searchedFor);
    // this.evaluateHeight();
  }.observes('searcher.searchedFor'),
  search: function() {
    this.searcher.clearFacets();
    this.searcher.submitSearch();
  },
  // evaluateHeight: function() {
  //   // Recalculate textarea height 
  //   if (this.value.length > 45 && !this.expanded) {
  //     $('#' +this.get('elementId')).addClass('expanded');
  //     this.set('expanded', true);
  //   }
  //   else if (this.value.length <= 45 && this.expanded) {
  //     $('#' +this.get('elementId')).removeClass('expanded');
  //     this.set('expanded', false);
  //   }
  // },
  keyUp: function(e) {
    // var characterKey = event.keyCode <= 90 && event.keyCode >= 48;
    var terms = this.value.toString().replace(/\:\s/g, ':');
    this.searcher.setQuery(terms);
    // this.evaluateHeight();
  },
  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.search();
    }
  }
});

Dsa.SearchSubmit = Ember.TextField.extend({
  classNames: ['dsa-submit'],
  type: 'submit',
  value: 'Search',
  click: function() {
    this.searcher.clearFacets();
    this.searcher.submitSearch();
  }
});