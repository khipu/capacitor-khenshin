require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name = 'CapacitorKhenshin'
  s.version = package['version']
  s.summary = package['description']
  s.license = package['license']
  s.homepage = 'https://capacitorjs.com'
  s.author = package['author']
  s.source = { :git => 'https://github.com/khipu/capacitor-khenshin.git', :tag => package['name'] + '@' + package['version'] }
  s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
  s.resources = "ios/Plugin/**/*.{png,jpeg,jpg,storyboard,xib,xcassets,ttf}"
  s.ios.deployment_target  = '13.0'
  s.dependency 'Capacitor'
  s.dependency 'khenshin'
  s.static_framework = true
  s.swift_version = '5.1'
end
