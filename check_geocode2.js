// Test BigDataCloud reverse geocoding - used by many professional apps
// Free tier, no API key needed, much richer locality data than Nominatim

async function testBigDataCloud(lat, lng, label) {
  const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lng + '&localityLanguage=en';
  const res = await fetch(url, { headers: { 'User-Agent': 'BazaarBee/1.0' } });
  const data = await res.json();

  console.log('\n=== ' + label + ' ===');
  console.log('locality      :', data.locality);
  console.log('city          :', data.city);
  console.log('postcode      :', data.postcode);
  console.log('principalSub  :', data.principalSubdivision);
  
  // The localityInfo.informative array often has named areas
  if (data.localityInfo && data.localityInfo.informative) {
    console.log('informative areas:');
    data.localityInfo.informative.forEach(i => console.log('  -', i.name, '(order:', i.order, ')'));
  }
  if (data.localityInfo && data.localityInfo.administrative) {
    console.log('administrative levels:');
    data.localityInfo.administrative.forEach(i => console.log('  -', i.name, '(order:', i.order, ')'));
  }
}

async function run() {
  // Sardarpara area (pin location from screenshot)
  await testBigDataCloud(25.7500, 89.2580, 'Sardarpara area');
  await testBigDataCloud(25.7490, 89.2600, 'Slightly east');
  await testBigDataCloud(25.7520, 89.2540, 'Near Sardar Para Rd');

  // Also test Nominatim for comparison
  console.log('\n=== Nominatim for same area ===');
  const nom = await fetch(
    'https://nominatim.openstreetmap.org/reverse?lat=25.7500&lon=89.2580&format=json&addressdetails=1&zoom=18&accept-language=en',
    { headers: { 'User-Agent': 'BazaarBee/1.0' } }
  );
  const nomData = await nom.json();
  console.log('address:', JSON.stringify(nomData.address, null, 2));
}

run();
