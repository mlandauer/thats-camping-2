#!/usr/bin/env ruby
#
# Convert plist data to json

require 'rubygems'
require 'plist'
require 'json'
require 'csv'

def load_plist(input)
  Plist::parse_xml(File.join(File.dirname(__FILE__), input))
end

def write_json(data, output)
  File.open(File.join(File.dirname(__FILE__), "..", "www", output), 'w') do |f|
    f.write(JSON.pretty_generate(data))
  end
end

def write_csv(data, output)
  keys = data.map{|r| r.keys}.flatten.uniq

  CSV.open(output, "w") do |f|
    f << keys
    data.each do |r|
      f << keys.map{|k| r[k]}
    end
  end
end

# Merge campsites and parks into one file
all_campsites = load_plist('Campsites.plist')
all_parks = load_plist('Parks.plist')

# Add ids
id = 0
all_campsites = all_campsites.map do |campsite|
  id += 1
  campsite.merge("id" => id)
end

id = 0
all_parks = all_parks.map do |park|
  id += 1
  park.merge("id" => id)
end

campsites = all_campsites.map do |campsite|
  park = all_parks.find{|park| campsite["parkWebId"] == park["webId"]}
  # The Ember guide is currently incorrect. It suggests this should be park_id rather than park
  campsite.merge(:park => park["id"])
end

parks = all_parks.map do |park|
  array = all_campsites.find_all{|campsite| campsite["parkWebId"] == park["webId"]}.map{|campsite| campsite["id"]}
  park.merge(:campsites => array)
end

write_json({:campsites => campsites, :parks => parks}, "campsites")

# Also write the campsites to a csv file
#write_csv(campsites, "campsites.csv")