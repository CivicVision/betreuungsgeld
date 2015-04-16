$ ->
  bundeslaenderPercentSql= "https://milafrerichs.cartodb.com/api/v2/sql?q=SELECT land, (leistungsbezuge_insgesamt * 100 / kinder_2013) as percent_empfaenger FROM elterngeld_4_quartal_kinder_2013 ORDER BY percent_empfaenger"
  queue()
  .defer(d3.csv, "data/abkuerzungen.csv")
  .defer(d3.json, bundeslaenderPercentSql)
  .await  (error, abkuerzungen, data) ->
    data = data.rows
    padding = 40
    data.map((d) -> d.percent_empfaenger = Math.round(d.percent_empfaenger*100)/100)
    data.map((d) -> d.land = _.findWhere(abkuerzungen, { land: d.land}).abkuerzung)
    width = $('#bundeslaender').width() - padding
    barchart = new Barchart(data, { width: width })
    barchart.setXDomain(data.map((d) -> d.land))
    barchart.setYDomain([0,d3.max(data, (d) -> d.percent_empfaenger)])
    barchart.setValueKey('percent_empfaenger')
    barchart.setGroupKey('land')
    barchart.render('#percent-bl-chart')
