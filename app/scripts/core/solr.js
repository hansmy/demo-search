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
// Solr Searcher
Dsa.SolrSearcher = Dsa.Searcher.extend({
  params: {
    wt: 'json',
    fq: []
  },
  setQuery: function (query) {
    var formattedQuery = query.replace(/( and | not | or )/g, function(s) {return s.toUpperCase();});

    this.params.q = formattedQuery;
  },
  // addFacet: function (field, value) {
  //   this.params.fq.push(field +':'+ value);
  // },
  getResults: function () {
    console.log('getResults, results:', this.searchResponse.responseHeader.params.q);

    return this.searchResponse.response.docs;
  },
  getHighlights: function () {
    return this.searchResponse.highlighting;
  },
  getFacets: function() {

    var self = this;

    // Solr has an unusual formatting for the facets
    // This places them in a more accessible format
    var formatFacets = function(fieldName, rawFacetValues) {
      var tempFacetValues = [];
      for (var i=0; i < rawFacetValues.length; i+=2) {
        var value = rawFacetValues[i];
        var count = rawFacetValues[i+1];
        var f = fieldName;
	var icon=fieldName=='icon';
        if (count > 0) {

          tempFacetValues.push({
            value: value, 
            count: count, 
            fieldName: fieldName, 
           isIcon:  icon,
            selectFacet: function() {
              self.addFacet(this.fieldName, '"' + this.value + '"', true);
            }
          });
        }
      }
      return tempFacetValues;
    };

    var facets = [];

    var rawFacetFields = this.get('searchResponse').facet_counts.facet_fields;
    for (var facetField in rawFacetFields) {
      var facetObject = {
        facetField: facetField,
        facets: []
      };
      // console.log("facetField", facetField);
      facetObject.facets = formatFacets(facetField, rawFacetFields[facetField]);
      facets.push(facetObject);

    }


    var getTimeRange = function (timestamp) {
        var start = timestamp,
            year = Number(start.slice(0,4)) + 1,
            end = start.substring(0, 4) + '-12-31T23:59:59Z'
        ;
        return '['+start+' TO '+end+']';
    };


    var formatDateFacets = function(fieldName, rawFacetValues) {
      var tempFacetValues = [];

      for (var rawFacetValue in rawFacetValues) {
        
        // if (rawFacetValue === 'gap' || rawFacetValue === 'start' || rawFacetValue === 'end'){
        //   continue;
        // }

        year = Dsa.Utils.formatISODate(rawFacetValue, "year");
        count = rawFacetValues[rawFacetValue];
	var icon=fieldName=='icon';
        if (count > 0) {
          tempFacetValues.push({
            value: year,
            range: getTimeRange(rawFacetValue),
            count: count, 
            fieldName: fieldName,
            isIcon: icon ,
            selectFacet: function() {
              self.addFacet(this.fieldName, this.range, true); 
            }
          });
        }
      }
      tempFacetValues.reverse();
      return tempFacetValues;
    };

    var rawFacetDates = this.get('searchResponse').facet_counts.facet_dates;
    for (var dateField in rawFacetDates) {
      var dateObject = {
        facetField: dateField,
        facets: []
      };
      dateObject.facets = formatDateFacets(dateField, rawFacetDates[dateField]);

      facets.push(dateObject);
    }

    return facets;
  },
  updateFq: function() {
    this.params.fq = this.getSelectedFacets("array");
  // console.log("Set FQ to ", this.getSelectedFacets("array"));
  },
  clearFacets: function() {
    this.selectedFacets.clear();
    this.updateFq();
  },
  addFacet: function (field, value, redirect) {

    var self = this;
    var thisFacet = field + ':' + value;

    self.selectedFacets.addObject({
      'field': field,
      'value': value,
      removeFacet: function () {
        self.selectedFacets.removeObject(this);
        self.params.start = 0;
        self.updateFq();
      }
    });

    self.updateFq();

    if (redirect) {
      self.params.start = 0;
      var urlHash = '/search/' + Dsa.Utils.returnSearchHash(self.params.q, this.getSelectedFacets(), self.params.sort);

      window.location.hash = urlHash;
    }
    
    console.log('addFacet', this.selectedFacets.get('content'));
  },
   selectedFacets: Em.ArrayController.create({
    content: []
  }),
  getSelectedFacets: function(returnType) {
    var facets = this.get('selectedFacets.content');
    var fq = [];

    for (var i=0; i<facets.length; i++) {
      var key = facets[i].field,
          value = facets[i].value,
          kind = typeof value,
          facet;

      console.log("getSelectedFacets:", "kind", kind, "value", value);

      if (kind === 'string') {
        facet = key + ':' + value,
        fq.push(facet);
      }
      else if (kind === 'object') {
        for (var item in value) {
          if (value.hasOwnProperty(item)) {
            facet = key + ':' + value[item];
            fq.push(facet);
          }
        }
      }
    }

    if (returnType === "array") {
      console.log("getSelectedFacets", fq);
      return fq;
    }

    console.log("getSelectedFacets", fq.join(','));
    return fq.join(',');
  },
  removeSelectedFacet: function (facet) {
    facet.removeFacet();
    var params = this.get('params');
    var urlHash = '/search/' + Dsa.Utils.returnSearchHash(params.q, this.getSelectedFacets(), params.sort);
    window.location.hash = urlHash;
  }
});
