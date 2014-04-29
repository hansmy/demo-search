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
  FACETS
  ==============================
*/

Dsa.TextFacetGroup = Dsa.SearcherObserver.extend({
  update: function() {
    var rawFacetGroups = this.searcher.getFacets();
    var self = this;

    rawFacetGroups.forEach ( function(rawFacetGroup) {
      if(rawFacetGroup.facetField === self.fieldName) {
        var formattedFacets = [];
        rawFacetGroup.facets.forEach(function (facet, index) {
          var newFacet = self.facetClass.create(facet);
          newFacet.set("searcher", self.searcher);

          if (!self.get('expanded') && index < 3) {
            formattedFacets.push(newFacet);
          }
          else if (self.get('expanded')) {
            formattedFacets.push(newFacet);
          }
        });
        
        self.set('facets', formattedFacets);
      }
    });
  },
  templateName: "facet-group",
  searcher: null,
  fieldName: null,
  displayName: null,
  facets: [],
  expanded: false,
  expandable: function() {
    return this.facets.length > 2 ? true : false;
  }.property('facets'), 
  expandText: function() {
    var expanded = this.get('expanded');

    return !expanded ? 'Show More' : 'Show Less';

  }.property('this.expanded'),
  actions: {
    showList: function(e) {
      var id = '#' + this.get('elementId');

      $(id).find('.facets-list').slideToggle(100)
      console.log("showing list?", id)
    },
    toggleFacetLimit: function(e) {
      if (this.get('expandable')) {
        this.set('expanded', !this.get('expanded'));
        this.update();
      }
    }
  },
  facetClass: Em.View.extend({
    templateName: 'facet',
    click: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.selectFacet();
    }

  })
});
