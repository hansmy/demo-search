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
  SEARCHERS
  ==============================
  Dsa.Searcher is a generic class that sets up some good default items and functions. This class will be extended to create searchers that are specific to a given search type such as Solr or ElasticSearch.
*/

Dsa.Searcher = Em.ObjectController.extend({
  params: {},
  url: null, // User must specify a url!
  searchResponse: null,
  isSearching: null,
  responseTime: null,
  submitSearch: function (params) {
    if (this.params.q) {
      this.params.start = 0;
      if (params !== 'sort') {this.clearFacets();}
      

      var urlHash = '/search/' + Dsa.Utils.returnSearchHash(this.params.q, this.getSelectedFacets(), this.params.sort);
      window.location.hash = urlHash;      
    } 
  },
  numFound: function() {
    var formatNumber = function (n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");      
    };

    if (this.searchResponse) {
      var numFound = this.searchResponse.response.numFound;
      return numFound.toString().length < 3 ? numFound : formatNumber(numFound);
    } else {
      return false;
    }
  }.property('searchResponse'),
  allResultsLoaded: function(){
    var numFound = parseInt(this.get('numFound').toString().replace(/[^0-9]/g, ''), 10);
    // console.log("allResultsLoaded", this.params.start, numFound);
    
    if (this.params.start < numFound || !numFound) {
      return false;
    } 
    return true;
  }.property('numFound', 'isSearching'),
  noResults: function() {
    var numFound = parseInt(this.get('numFound').toString().replace(/[^0-9]/g, ''), 10);

    if (numFound === 0 && !this.isSearching) {
      return true;
    }
    return false;
  }.property('numFound', 'isSearching'),
  searchedFor: null,
  search: function() {
    var self = this;
    
    self.setProperties({
      isSearching: true,
      searchedFor: self.params.q,
      responseTime: new Date().getTime()
    });

    console.log("params?", self.params, self.url);
    
    $.ajax({
      url: self.url,
      data: self.params,
      traditional: true,
      cache: true,
      success: function(data) {
        self.set('isSearching', false);

        var now = new Date().getTime();
        self.set("searchResponse", data);
        self.success();

        // self.set('searchedFor', self.params.q);
        self.set('responseTime', now - self.responseTime);
      },
      statusCode: {
        400: function() {
          self.set('isSearching', false);
          throw "Search Error";
        }
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf',
      beforeSend: function(j, s) {
        // console.log('beforeSend', s.url.replace(/\=/g, ": ").split('&'));
      }
    });
  
  },
  loadNextResults: function() {
    var allResultsLoaded = this.get('allResultsLoaded'),
        noResults = this.get('noResults'),
        isSearching = this.get('isSearching');

    if (!allResultsLoaded && !noResults && !isSearching) {
      this.search();
    }
  },
  setQuery: function () {
    throw "Implement a setQuery method for your searcher";
  },
  addFacet: function (field, value) {
    throw "Implement an addFacet method for your searcher";
  },
  getResults: function () {
    throw "Implement a getResults method on your searcher";
  },
  getFacets: function () {
    throw "Implement a getFacets method on your searcher";
  },
  getHighlights: function () {
    throw "Implement a getFacets method on your searcher";
  },
  success: function () {
    throw "Implement a success method on your searcher";
  }
});

var test={ "response":
  {"numFound":19,"start":0,"docs":[
      {
        "icon":"page_white_acrobat",
        "size":3060846,
        "id":"/notube_d3-1-user-and-context-model-specification_final.pdf",
        "when":"2014-02-17T07:38:08Z",
        "path":"/notube_d3-1-user-and-context-model-specification_final.pdf",
        "title":["/notube_d3-1-user-and-context-model-specification_final.pdf"]},
      {
        "icon":"page_white_acrobat",
        "size":877634,
        "id":"/06354384.pdf",
        "when":"2014-02-17T07:38:12Z",
        "path":"/06354384.pdf",
        "title":["/06354384.pdf"],
        "keywords":"ubiquitous systems, location intelligence, context awareness"},
      {
        "icon":"page_white_acrobat",
        "size":630898,
        "id":"/ewic_fdia09_s1paper6.pdf",
        "when":"2014-02-17T07:38:15Z",
        "path":"/ewic_fdia09_s1paper6.pdf",
        "title":["/ewic_fdia09_s1paper6.pdf"]},
      {
        "icon":"page_white_acrobat",
        "size":258219,
        "id":"/lopes_hcir_2010.pdf",
        "when":"2014-02-10T08:12:55Z",
        "path":"/lopes_HCIR_2010.pdf",
        "title":["/lopes_HCIR_2010.pdf"]},
      {
        "icon":"page_white_acrobat",
        "size":408277,
        "id":"/deanhall_trec12.pdf",
        "when":"2014-02-10T08:37:47Z",
        "path":"/deanhall_trec12.pdf",
        "title":["/deanhall_trec12.pdf"],
        "keywords":""},
      {
        "icon":"page_white_acrobat",
        "size":3009696,
        "id":"/1-s2.0-s0885230809000151-main (5).pdf",
        "when":"2014-02-10T08:12:51Z",
        "path":"/1-s2.0-S0885230809000151-main (5).pdf",
        "title":["/1-s2.0-S0885230809000151-main (5).pdf"]},
      {
        "icon":"page_white_acrobat",
        "size":934529,
        "id":"/06225928.pdf",
        "when":"2014-02-17T07:38:25Z",
        "path":"/06225928.pdf",
        "title":["/06225928.pdf"],
        "keywords":""},
      {
        "icon":"page_white_acrobat",
        "size":344747,
        "id":"/p309-church.pdf",
        "when":"2014-03-24T06:59:57Z",
        "path":"/p309-church.pdf",
        "title":["/p309-church.pdf"]},
      {
        "icon":"page_white_acrobat",
        "size":399117,
        "id":"/06200611.pdf",
        "when":"2014-02-17T07:38:18Z",
        "path":"/06200611.pdf",
        "title":["/06200611.pdf"],
        "keywords":"Mobile Search"},
      {
        "icon":"page_white_acrobat",
        "size":149984,
        "id":"/05766922.pdf",
        "when":"2014-02-17T07:38:27Z",
        "path":"/05766922.pdf",
        "title":["/05766922.pdf"]}
        ]
  },
  "facet_counts":{
    "facet_queries":{},
    "facet_fields":{
      "icon":[
        "page_white_acrobat",18,
        "page_white_code",1,
        "page_white_text",0],
      "keywords":[
        "information",2,
        "location",2,
        "mobile",2,
        "retrieval",2,
        "search",2,
        "systems",2,
        "alignment",1,
        "analysis",1,
        "awareness",1,
        "based",1,
        "by",1,
        "context",1,
        "differences",1,
        "empirical",1,
        "enhanced",1,
        "hashing",1,
        "humming",1,
        "individual",1,
        "intelligence",1,
        "key",1]},
    "facet_dates":{},
    "facet_ranges":{}
  },
  "highlighting":{
    "/notube_d3-1-user-and-context-model-specification_final.pdf":{
      "attr_content":[" User and <em>Context</em> model\nSpecification\n \n Coordinator: Davide Palmisano, Michele Minno\nWith contributions"],
      "title":["/notube_d3-1-user-and-<em>context</em>-model-specification_final.pdf"],
      "path":["/notube_d3-1-user-and-<em>context</em>-model-specification_final.pdf"]
      },
    "/06354384.pdf":{
      "attr_content":[" \n \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n <em>Context</em> Aware"],
      "keywords":["ubiquitous systems, location intelligence, <em>context</em> awareness"],
      "attr_dc_subject":["ubiquitous systems, location intelligence, <em>context</em> awareness"],
      "attr_meta_keyword":["ubiquitous systems, location intelligence, <em>context</em> awareness"],
      "attr_meta":["ubiquitous systems, location intelligence, <em>context</em> awareness"],
      "attr_dc_title":["<em>Context</em> Aware Services for Mobile Users: JQMobile vs Flash Builder Implementations "]
      },
    "/ewic_fdia09_s1paper6.pdf":{
      "attr_content":[" \n \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n \n    \n <em>Context</em> Features and their use in"]
      },
    "/lopes_hcir_2010.pdf":{
      "attr_content":[" \n \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n \n    \n <em>Context</em> in Health Information"]
      },
    "/deanhall_trec12.pdf":{
      "attr_content":[" complex information needs that\nare highly dependent on <em>context</em> and user interests. According to a report"]
      },
    "/1-s2.0-s0885230809000151-main (5).pdf":{
      "attr_content":[" <em>CONTEXT</em> QUERY LANGUAGE WITH PARAMETRIC POLYMORPHI SM AND SUBTYPING \n \n    \n A STAT ICALLY TYPED LOGIC"],
      "attr_meta":["A STATICALLY TYPED LOGIC <em>CONTEXT</em> QUERY LANGUAGE WITH PARAMETRIC POLYMORPHI SM AND SUBTYPING"],
      "attr_dc_title":["A STATICALLY TYPED LOGIC <em>CONTEXT</em> QUERY LANGUAGE WITH PARAMETRIC POLYMORPHI SM AND SUBTYPING"]
      },
    "/06225928.pdf":{
      "attr_content":["-Organizing Models for the Gamification of <em>Context</em>-Aware User Applications \n \n    \n Toward Adopting Self"],
      "attr_meta":["Toward Adopting Self-Organizing Models for the Gamification of <em>Context</em>-Aware User Applications"],
      "attr_dc_title":["Toward Adopting Self-Organizing Models for the Gamification of <em>Context</em>-Aware User Applications"]
      },
    "/p309-church.pdf":{
      "attr_content":[" search queries be augmented by <em>context</em> in-\nformation, as a way to help search engines to retrieve more"]
      },
    "/06200611.pdf":{
      "attr_content":[" Search through Location Based <em>Context</em> and Personalization \n \n    \n   \n \n  Improving Mobile Search through"],
      "attr_meta":["Improving Mobile Search through Location Based <em>Context</em> and Personalization"],
      "attr_dc_title":["Improving Mobile Search through Location Based <em>Context</em> and Personalization"]
      },
    "/05766922.pdf":{
      "attr_content":[" psychology literature, I identify a potential problem  \nin this approach - the goal <em>context</em> that the majority"]
      }
    }
  };
