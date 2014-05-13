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
  RESULT SETS
  ==============================
*/

Dsa.ResultSet = Dsa.SearcherObserver.extend({
  templateName: "results",
  results: null,
  highlights: null,
  update: function() {
    var results = this.searcher.getResults();

    console.log("results updating", "start", this.searcher.params.start, results.length);

    if (this.searcher.params.start === 0) {
      this.set('results', []);
    }
    //Adding highlight snipet
    var highlights=this.searcher.getHighlights();
     for (var i=0; i < results.length; i++) {
      console.log(results[i]);
      var id=results[i].id;
      console.log(highlights[id]);
      results[i].snipet= highlights[id];
      console.log(results[i]);
      this.results.addObject(results[i]);  

    }
    


    this.searcher.params.start += this.searcher.params.rows;
    this.searcher.set('searchedFor', this.searcher.params.q);
  }
});