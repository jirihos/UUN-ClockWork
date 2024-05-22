/*


#define BATTERY_UPDATE_INTERVAL (60 * 60 * 1000)
#define TEMPERATURE_PUB_NO_CHANGE_INTEVAL (1 * 60 * 1000)


// PIR instance
twr_module_pir_t pir;

// Thermometer instance
twr_tmp112_t tmp112;
event_param_t temperature_event_param = { .next_pub = 0 };

void battery_event_handler(twr_module_battery_event_t event, void *event_param)
{
    (void) event_param;

    float voltage;

    if (event == TWR_MODULE_BATTERY_EVENT_UPDATE)
    {
        if (twr_module_battery_get_voltage(&voltage))
        {
            twr_radio_pub_battery(&voltage);
        }
    }
}

void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
{
    float value;
    event_param_t *param = (event_param_t *)event_param;

    if (event == TWR_TMP112_EVENT_UPDATE)
    {
        if (twr_tmp112_get_temperature_celsius(self, &value))
        {
            twr_radio_pub_temperature(param->channel, &value);

            param->value = value;
            param->next_pub = twr_scheduler_get_spin_tick() + TEMPERATURE_PUB_NO_CHANGE_INTEVAL;
        }
    }
}

void application_init(void)
{

    // Initialize logging
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    // Initialize battery
    twr_module_battery_init();
    twr_module_battery_set_event_handler(battery_event_handler, NULL);
    twr_module_battery_set_update_interval(BATTERY_UPDATE_INTERVAL);

    // Initialize thermometer sensor on core module
    temperature_event_param.channel = TWR_RADIO_PUB_CHANNEL_R1_I2C0_ADDRESS_ALTERNATE;
    twr_tmp112_init(&tmp112, TWR_I2C_I2C0, 0x49);
    twr_tmp112_set_event_handler(&tmp112, tmp112_event_handler, &temperature_event_param);
    twr_tmp112_set_update_interval(&tmp112, TEMPERATURE_PUB_NO_CHANGE_INTEVAL);

}

// změna
*/

#include <application.h>
#include <twr_matrix.h>

#define MULTIPLEKEYS -1

// LED instance
twr_led_t led;

// Matrix keyboard state
uint64_t matrix_state;
// Matrix keyboard instance
twr_matrix_t matrix;
// Layout of your keyboard
char keys[] =
{
    '1','2','3','A',
    '4','5','6','L',
    '7','8','9','D',
    '*','0','#','X'
};

// Set output and input ports
twr_gpio_channel_t out_gpio[]  = {TWR_GPIO_P2, TWR_GPIO_P3, TWR_GPIO_P4, TWR_GPIO_P5};
twr_gpio_channel_t in_gpio[]  = {TWR_GPIO_P6, TWR_GPIO_P7, TWR_GPIO_P8, TWR_GPIO_P9};

char codeBuffer[5];

#define OUT_GPIO_LENGTH (sizeof(out_gpio)/sizeof(twr_gpio_channel_t))
#define IN_GPIO_LENGTH (sizeof(in_gpio)/sizeof(twr_gpio_channel_t))


// Radio incoming messages led/-/set/state
static const twr_radio_sub_t subs[] = {
    {"led/-/set/state", TWR_RADIO_SUB_PT_INT, twr_led, (void *) true}
};

// Led action if
void twr_led(uint64_t *id, const char *topic, void *value, void *param)
{
    int val = *(int *)value;
    twr_log_debug("led command %d", val);
    
    if(val == 0)
    {
        twr_led_pulse(&led, 1000);
    }
    else
    {
        twr_led_blink(&led, 2);
    }
}

void matrix_event_handler(twr_matrix_t *self, twr_matrix_event_t event, void *event_param)
{
    char pressed_key[2];

    // Get current pressed key
    matrix_state = twr_matrix_get_state(&matrix);
    
    // Codebuffer log
    twr_log_debug("matrix state: %s",codeBuffer);


    if (!matrix_state)
    {
        return;
    }
    else if (matrix_state & (1 << 3)) // Arrived
    {
        char xFunc[] = "A";  // Arrived
        sprintf(codeBuffer, "%s%s", codeBuffer, xFunc);
        twr_radio_pub_string("user", codeBuffer);
        memset(codeBuffer, 0, sizeof(codeBuffer));
        twr_led_pulse(&led, 30);
        return;
    }
    else if (matrix_state & (1 << 7)) // Left
    {
        char xFunc[] = "L"; // Left
        sprintf(codeBuffer, "%s%s", codeBuffer, xFunc);
        twr_radio_pub_string("user", codeBuffer);
        memset(codeBuffer, 0, sizeof(codeBuffer));
        twr_led_pulse(&led, 30);
        return;
    }
    else if (matrix_state & (1 << 11)) // Doctor
    {
        char xFunc[] = "D"; // Doctor
        sprintf(codeBuffer, "%s%s", codeBuffer, xFunc);
        twr_radio_pub_string("user", codeBuffer);
        memset(codeBuffer, 0, sizeof(codeBuffer));
        twr_led_pulse(&led, 30);
        return;
    }
    else if (matrix_state & (1 << 15)) // Holiday
    {
        char xFunc[] = "H"; // Holiday
        sprintf(codeBuffer, "%s%s", codeBuffer, xFunc);
        twr_radio_pub_string("user", codeBuffer);
        memset(codeBuffer, 0, sizeof(codeBuffer));
        twr_led_pulse(&led, 30);
        return;
    }
    else if (matrix_state & (1 << 12)) // Delete
    {
        memset(codeBuffer, 0, sizeof(codeBuffer));
        twr_led_pulse(&led, 800);
        return;
    }
    else if (strlen(codeBuffer) > 3) // Delete more than 4 digits long entry
    {
        memset(codeBuffer, 0, sizeof(codeBuffer)); 
        twr_led_pulse(&led, 800); 
        return;  
    }

    twr_led_pulse(&led, 30);

    int keyIndex = getKey(matrix_state);

    if (keyIndex == MULTIPLEKEYS)
    {
        return;
    }
    pressed_key[0] = keys[keyIndex];
    pressed_key[1] = '\0';
    strncat(codeBuffer, pressed_key, sizeof(codeBuffer));
}

int getKey(uint64_t keyCode)
{
    uint32_t total_zero_count = 0;
    int relative_position = __CLZ((uint32_t)keyCode);

    total_zero_count = (__CLZ((uint32_t)(keyCode) << (relative_position + 1)) + relative_position) + 1;

    if (total_zero_count < (sizeof(uint32_t) * 8))
    {
        return MULTIPLEKEYS;
    }
    else
    {
        return 31 - relative_position;
    }
}

void application_init(void)
{
    // Disable sleep in case of receiving data
    twr_system_deep_sleep_disable();

     // initialize logging
    twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

    // Initialize Battery Module
    twr_module_battery_init();

    // Initialize matrix keyboard and clear code buffer that is storing password
    twr_matrix_init(&matrix, out_gpio, OUT_GPIO_LENGTH, in_gpio, IN_GPIO_LENGTH);
    twr_matrix_set_event_handler(&matrix, matrix_event_handler, NULL);
    //memset(codeBuffer, 0, sizeof(codeBuffer));

    // Initialize LED
    twr_led_init(&led, TWR_GPIO_LED, false, false);
    twr_led_pulse(&led, 30);

    // Initialize radio
    twr_radio_init(TWR_RADIO_MODE_NODE_LISTENING);
    twr_radio_set_subs((twr_radio_sub_t *) subs, sizeof(subs)/sizeof(twr_radio_sub_t));
    twr_radio_pairing_request("code-terminal", FW_VERSION);
    twr_radio_set_rx_timeout_for_sleeping_node(100);

    // Start log
    twr_log_debug("start");

}

