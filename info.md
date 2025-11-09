# Centri Propane Tank Card

Display your propane tank level with a beautiful horizontal tank visualization in Home Assistant.

## Features

✨ **Visual horizontal propane tank display**  
🎨 **Color-coded levels** - Red (≤25%), Orange (≤50%), Yellow (≤75%), Green (>75%)  
📊 **Shows percentage and estimated gallons**  
⚡ **Smooth animations** when level changes  
🛡️ **Handles unavailable states** gracefully  
🎭 **Follows your Home Assistant theme**

## Configuration

```yaml
type: custom:ha-centri-propane-tank-card
entity: sensor.propane_tank_level
```

The entity should report a percentage value (0-100). The card assumes a 500-gallon tank capacity.

## Support

Found a bug or have a feature request? [Open an issue](https://github.com/royf007/ha-centri-propane-tank-card/issues)
