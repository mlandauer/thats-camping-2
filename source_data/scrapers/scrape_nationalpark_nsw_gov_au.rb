#!/usr/bin/env ruby

# www.nationalparks.nsw.gov.au has campsite information with location data
# It's all hidden away in the mapping info so it's a bit painful to get to, but...

require 'mechanize'
require 'csv'

agent = Mechanize.new

page = agent.get("http://www.nationalparks.nsw.gov.au/abercrombie-karst-conservation-reserve/map")

# Find the script tag with the most content
s = page.search("script").map{|p| p.inner_html}.sort{|a,b| b.length <=> a.length}.first

data = []
s.each_line do |line|
  if line =~ /Alm\('Accommodation'/
    d = line.strip[4..-3].split(",")
    lat = d[2][8..-1].to_f
    lng = d[3].to_f
    name = d[4][1..-2]
    type = d[7][1..-2]
    # This code denotes a camping site
    if type == "maBE8529118E1C4B64852D5EEA1406D0C7"
      data << [name, lat, lng]
      #puts "lat: #{lat}, lng: #{lng}, name: #{name}"
    end
  end
end

CSV.open("nationalpark_nsw_gov_au.csv", "w") do |f|
  f << ["Name", "Latitude", "Longitude"]
  data.each do |d|
    f << d
  end
end
