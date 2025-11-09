class HaCentriPropaneTankCard extends HTMLElement {
    set hass(hass) {
      if (!this.content) {
        this.innerHTML = `
          <ha-card header="Propane Tank Level">
            <div class="card-content">
              <svg class="tank-body" viewBox="0 16 243 104">
                <defs>
                  <clipPath id="tank-clip">
                    <path d="
                      M 48,30
                      L 195,30
                      A 30,30 0 0 1 225,60
                      A 30,30 0 0 1 195,90
                      L 48,90
                      A 30,30 0 0 1 18,60
                      A 30,30 0 0 1 48,30
                      Z
                    "/>
                  </clipPath>
                </defs>
                
                <rect class="tank-liquid" x="18" y="0" width="207" height="120" clip-path="url(#tank-clip)"/>
                
                <rect class="tank-supports" x="30" y="96" width="32" height="10" rx="2"/>
                <rect class="tank-supports" x="181" y="96" width="32" height="10" rx="2"/>
                
                <rect class="tank-valve" x="113" y="12" width="24" height="14" rx="2"/>
                
                <path class="tank-outline" d="
                  M 48,30
                  L 195,30
                  A 30,30 0 0 1 225,60
                  A 30,30 0 0 1 195,90
                  L 48,90
                  A 30,30 0 0 1 18,60
                  A 30,30 0 0 1 48,30
                  Z
                "/>
                
                <text class="level-text" x="121" y="102">0% (0 gal)</text>
              </svg>
            </div>
          </ha-card>
        `;
  
        this.content = this.querySelector('.card-content');
        const style = document.createElement('style');
        style.textContent = `
          .card-content {
            padding: 16px;
          }
          .tank-body {
            width: 100%;
          }
          .tank-outline {
            fill: none;
            stroke: var(--primary-text-color);
            stroke-width: 4;
          }
          .tank-liquid {
            fill: var(--primary-color);
            transition: fill 0.3s ease-in-out;
          }
          .tank-supports, .tank-valve {
            fill: var(--secondary-text-color);
          }
          .level-text {
            fill: var(--primary-text-color);
            font-size: 14px;
            font-weight: bold;
            text-anchor: middle;
            dominant-baseline: middle;
          }
        `;
        this.appendChild(style);
      }
  
      const entityId = this.config.entity;
      const state = hass.states[entityId];
      
      if (state) {
        const level = parseFloat(state.state);
        const liquid = this.querySelector('.tank-liquid');
        const text = this.querySelector('.level-text');

        // Check for invalid number state
        if (isNaN(level) || level === null || state.state === '') {
          liquid.style.fill = '#444444';  // Dark gray for unavailable
          liquid.setAttribute('y', 30);    // Fill to top
          liquid.setAttribute('height', 60); // Full height of tank
          text.textContent = 'Unavailable';
          return;
        }
        
        // Get tank size from config, default to 500 gallons
        const tankSize = this.config.tank_size || 500;
        const gallons = Math.round((level / 100) * tankSize);
        const topY = 30;
        const bottomY = 90;
        
        // Calculate fill height
        let fillHeight;
        if (level === 100) {
            fillHeight = topY;
        } else if (level === 0) {
            fillHeight = bottomY;
        } else {
            fillHeight = bottomY - ((level / 100) * (bottomY - topY));
        }
        
        liquid.setAttribute('y', fillHeight);
        liquid.setAttribute('height', bottomY - fillHeight);
        text.textContent = `${level.toFixed(1)}% (${gallons} gal)`;
  
        // Set color based on level
        let fillColor;
        if (level <= 25) {
          fillColor = '#ff3b30';
        } else if (level <= 50) {
          fillColor = '#ff9500';
        } else if (level <= 75) {
          fillColor = '#ffcc00';
        } else {
          fillColor = '#34c759';
        }
        liquid.style.fill = fillColor;
      }
    }
  
    setConfig(config) {
      if (!config.entity) {
        throw new Error('Please define an entity');
      }
      this.config = config;
    }
  
    getCardSize() {
      return 3;
    }
  
    static getStubConfig() {
      return {
        entity: "sensor.propane_tank_level",
        tank_size: 500
      };
    }
  }
  
  customElements.define('ha-centri-propane-tank-card', HaCentriPropaneTankCard);