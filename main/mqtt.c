#include <stdio.h>
#include <stdint.h>
#include <stddef.h>
#include <string.h>
#include <esp_idf_version.h>
#include <max7219.h>
#include "Lab11.h"


#include <esp_idf_version.h>
#include <max7219.h>

#include "esp_log.h"
#include "mqtt_client.h"

#include "driver/gpio.h"
#include "freertos/queue.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#ifndef APP_CPU_NUM
#define APP_CPU_NUM PRO_CPU_NUM
#endif

#if ESP_IDF_VERSION < ESP_IDF_VERSION_VAL(4, 0, 0)
#define HOST    HSPI_HOST
#else
#define HOST    SPI2_HOST
#endif

#define CASCADE_SIZE 1
#define MOSI_PIN 23
#define CS_PIN 5
#define CLK_PIN 18

max7219_t dev = {
  .cascade_size = CASCADE_SIZE,
  .digits = 0,
  .mirrored = true
};

QueueHandle_t queue;

 uint64_t symbols[] = {


  0x8142241818244281
  
};
// static const size_t symbols_size = sizeof(symbols) - sizeof(uint64_t) * CASCADE_SIZE;
 

static const char *TAG = "MQTT";

static void log_error_if_nonzero(const char *message, int error_code)
{
  if(error_code != 0)
  {
    ESP_LOGE(TAG, "Last error %s: 0x%x", message, error_code);
  }
}



static void mqtt_event_handler(void *handler_args, esp_event_base_t base, int32_t event_id, void *event_data)
{
  ESP_LOGD(TAG, "Event dispatched from event loop base=%s, event_id=%" PRIi32 "", base, event_id);
  esp_mqtt_event_handle_t event = event_data;
  esp_mqtt_client_handle_t client = event->client;

  

  
  switch((esp_mqtt_event_id_t)event_id)
  {
    case MQTT_EVENT_CONNECTED:
      ESP_LOGI(TAG, "MQTT_EVENT_CONNECTED");
      // esp_mqtt_client_publish(client, "/topic/qos1", "data for qos1", 0, 1, 0);
      // esp_mqtt_client_subscribe(client, "/topic/66021937/button", 0);
      esp_mqtt_client_subscribe(client, "/topic/66021937/payload", 0);
      // esp_mqtt_client_subscribe(client, "/topic/qos1", 1);
      // esp_mqtt_client_unsubscribe(client, "/topic/qos1");
      // queue = xQueueCreate(10, sizeof( uint32_t ) );
      // xTaskCreate(taskProducer, "Produce", 2048, (void*)ProducerText, 10, NULL);
      // xTaskCreate(taskConsumer, "Consumer", 2048, (void*)ConsumerText, 10, NULL);
      // esp_mqtt_client_publish(client, "/topic/66021937/button", "push", 0, 0, 0);
      
      
      break;

    case MQTT_EVENT_DISCONNECTED:
      ESP_LOGI(TAG, "MQTT_EVENT_DISCONNECTED");
      break;

    case MQTT_EVENT_SUBSCRIBED:
      ESP_LOGI(TAG, "MQTT_EVENT_SUBSCRIBED, msg_id=%d", event->msg_id);
      // esp_mqtt_client_publish(client, "/topic/66021937/button", "data from board", 0, 0, 0);
      break;

    case MQTT_EVENT_UNSUBSCRIBED:
      ESP_LOGI(TAG, "MQTT_EVENT_UNSUBSCRIBED, msg_id=%d", event->msg_id);
      break;

    case MQTT_EVENT_PUBLISHED:
      ESP_LOGI(TAG, "MQTT_EVENT_PUBLISHED, msg_id=%d", event->msg_id);
      break;

    case MQTT_EVENT_DATA:
      ESP_LOGI(TAG, "MQTT_EVENT_DATA");
      
      printf("TOPIC=%.*s\r\n", event->topic_len, event->topic);
      printf("DATA=%.*s\r\n", event->data_len, event->data);
      int ddd = event->data_len;
      printf("%d\r\n",ddd);
      char payload[16];
      for (int i = 0; i < ddd ; i++)
      {
        printf("%d\r\n",i);
        payload[i] = event->data[i];

      }
      printf("%s\r\n",payload);
      unsigned long long hexValue  = strtoull(payload, NULL, 16);
      printf("Hex value: 0x%016llx\r\n", hexValue);
      symbols[0] = hexValue ;
      max7219_draw_image_8x8(&dev,0,(uint8_t *)symbols );
      
      // printf("DATA=%c\r\n", event->data[1]);
      // if (event->topic[16] == 'l')
      // {
      
      //   if(event->data[1] == 'n' || event->data[1] == 'N'){
      //     gpio_set_level(GPIO_OUTPUT_IO_0, 0);
      //   }else if(event->data[1] == 'f' || event->data[1] == 'F'){
      //     gpio_set_level(GPIO_OUTPUT_IO_0, 1);
      //   }
      // }
      
      break;

    case MQTT_EVENT_ERROR:
      ESP_LOGI(TAG, "MQTT_EVENT_ERROR");
      if(event->error_handle->error_type == MQTT_ERROR_TYPE_TCP_TRANSPORT)
      {
        log_error_if_nonzero("reported from esp_tls", event->error_handle->esp_tls_last_esp_err);
        log_error_if_nonzero("reported from tls stack", event->error_handle->esp_tls_stack_err);
        log_error_if_nonzero("captured as transport's socket errno", event->error_handle->esp_transport_sock_errno);
        ESP_LOGI(TAG, "Last error string (%s)", strerror(event->error_handle->esp_transport_sock_errno));

      }
      break;

    default:
      ESP_LOGI(TAG, "Other event id:%d", event->event_id);
      break;
  }
}

void mqtt_app_start(void)
{
  // Configure SPI bus
  spi_bus_config_t cfg = {
    .mosi_io_num = MOSI_PIN,
    .miso_io_num = -1,
    .sclk_io_num = CLK_PIN,
    .quadwp_io_num = -1,
    .quadhd_io_num = -1,
    .max_transfer_sz = 0,
    .flags = 0
 };
 ESP_ERROR_CHECK(spi_bus_initialize(HOST, &cfg, 1));

 // Configure device

 ESP_ERROR_CHECK(max7219_init_desc(&dev, HOST, MAX7219_MAX_CLOCK_SPEED_HZ, CS_PIN));
 ESP_ERROR_CHECK(max7219_init(&dev));
 
  esp_mqtt_client_config_t mqtt_cfg = {
    .broker.address.uri = CONFIG_BROKER_URL,
  };

  esp_mqtt_client_handle_t client = esp_mqtt_client_init(&mqtt_cfg);
  esp_mqtt_client_register_event(client, ESP_EVENT_ANY_ID, mqtt_event_handler, NULL);
  esp_mqtt_client_start(client);

 
        // for (uint8_t i=0; i<CASCADE_SIZE; i++)
        max7219_draw_image_8x8(&dev,0,(uint8_t *)symbols );
        vTaskDelay ( 1000 / portTICK_PERIOD_MS );
        symbols[0] = 0xffc3a59999a5c3ff ;
        max7219_draw_image_8x8(&dev,0,(uint8_t *)symbols );
       

      
   
  // int inp;
  // int state = 0;
  // uint32_t ulVar = 0;
  // while(true){
  //     inp = gpio_get_level(GPIO_INPUT_IO_0);
  //     // printf("GPIO[%d] poll, val: %d\n",GPIO_INPUT_IO_0,inp);

  //     // if(inp == 0 && state == 0){
  //     //     esp_mqtt_client_publish(client, "/topic/66021937/button", "ON", 0, 0, 0);
  //     //     state = 1;
  //     // }else if(inp == 0 && state == 1){
  //     //   esp_mqtt_client_publish(client, "/topic/66021937/button", "OFF", 0, 0, 0);
  //     //     state = 0;
  //     // }

  //     if(inp == 0 ){
  //         esp_mqtt_client_publish(client, "/topic/66021937/button", "ON", 0, 0, 0);
  //         // esp_mqtt_client_publish(client, "/topic/66021937/led", "ON", 0, 0, 0);
  //         // state = 0 ;
  //     }else{
  //       // if (state == 0)
  //       // {
  //       //   esp_mqtt_client_publish(client, "/topic/66021937/led", "OFF", 0, 0, 0);
  //       // }
  //       // state += 1 ;
  //       esp_mqtt_client_publish(client, "/topic/66021937/button", "OFF", 0, 0, 0);
       
  //     }
      

  //     vTaskDelay ( 2000 / portTICK_PERIOD_MS );
  //     }

  }
  



// void taskProducer (void *pvParameter){
//     int inp;
//     int state = 0;
//     while(true){
//         inp = gpio_get_level(GPIO_INPUT_IO_0);
//         // printf("GPIO[%d] poll, val: %d\n",GPIO_INPUT_IO_0,inp);

//         if(inp == 0 ){
//             // printf("buuton is push\n");
//             ulVar++;
//             // printf("%ld\n", ulVar);-
//             state = 1;
            
            
           
//         }
//         if (state == 1 && inp == 1)
//         {
//             // printf("Reset and send parameter");
//             xQueueSend (queue, (void *)&ulVar, (TickType_t)10 );
//             ulVar = 0;
//             state = 0;
//         }
        

//         vTaskDelay ( 1000 / portTICK_PERIOD_MS );
//         }

//     }


//  void taskConsumer(void *pvParameter){
//     // uint8_t data;
//     uint32_t data;
//     while(true) {
//         if(xQueueReceive(queue,&data, portMAX_DELAY)){
//             // printf("[Queue] Recv, %s, val: %ld\r\n",(char*)pvParameter , data);
//             // esp_mqtt_client_publish(client, "/topic/66021937/button", "push", 0, 0, 0);
//             client.publish("/topic/66021937/button", "push")

//         }
//     }
// }


