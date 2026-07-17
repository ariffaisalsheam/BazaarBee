async function check() {
  try {
    // 1. Search for "Sardar Para Badminton Playground, Rangpur" to get coordinates
    const searchRes = await fetch('https://nominatim.openstreetmap.org/search?q=Sardar+Para+Badminton+Playground,+Rangpur&format=json&addressdetails=1', {
      headers: { 'User-Agent': 'BazaarBee/1.0' }
    });
    const searchData = await searchRes.json();
    console.log('Search Results:', JSON.stringify(searchData, null, 2));

    if (searchData.length > 0) {
      const { lat, lon } = searchData[0];
      console.log(`\nReverse geocoding lat=${lat}, lon=${lon}...`);
      
      // 2. Reverse geocode the coordinates
      const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&zoom=18`, {
        headers: { 'User-Agent': 'BazaarBee/1.0' }
      });
      const revData = await revRes.json();
      console.log('Reverse Geocode Address Details:', JSON.stringify(revData.address, null, 2));
      console.log('Display Name:', revData.display_name);
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
check();
