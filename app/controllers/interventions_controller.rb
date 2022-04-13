require "freshdesk"
require "json"

class InterventionsController < ApplicationController
  def create
    @intervention = Intervention.create!(
        author_id: current_user.id,
        customer_id: params[:customer],
        building_id: params[:building],
        battery_id: params[:battery],
        column_id: params[:column],
        elevator_id: params[:elevator],
        employee_id: params[:employee],
        report: params[:report][:report],
        status: "Pending"
    )
    freshdesk_domain = 'rocketelevators3200'
    # It could be either your user name or api_key.
    api_key = ENV['FRESHDESK_API']
    json_payload = {
        status: 2,
        priority: 1,
        "email": @intervention.author.email,
        "description":
        "An intervention has been requested by " + @intervention.author.first_name + " from the customer " + @intervention.customer.company_name + " at building address number " + 
        @intervention.building.address_id.to_s + ", battery id number " + @intervention.battery.id.to_s  + (!@intervention.column.nil? ? ", column id number " + @intervention.column.id.to_s : "")
         + (!@intervention.elevator.nil? ? ", and elevator id number " + @intervention.elevator.id.to_s : "") + ". The employee assigned to the task is " + 
         (!@intervention.employee.nil? ? @intervention.employee.first_name : "<UNASSIGNED>") + ". Thanks!",
        "type": "Incident",
        "subject": @intervention.report,
    }.to_json
    freshdesk_api_path = 'api/v2/tickets'
    freshdesk_api_url  = "https://#{freshdesk_domain}.freshdesk.com/#{freshdesk_api_path}"
    site = RestClient::Resource.new(freshdesk_api_url, api_key)
    begin
      response = site.post(json_payload, :content_type=>'application/json')
      puts "response_code: #{response.code} \n Location Header: #{response.headers[:location]}\n response_body: #{response.body}"
    rescue RestClient::Exception => exception
      puts 'API Error: Your request is not successful. If you are not able to debug this error properly, mail us at support@freshdesk.com with the follwing X-Request-Id'
      puts "X-Request-Id : #{exception.response.headers[:x_request_id]}"
      puts "Response Code: #{exception.response.code} Response Body: #{exception.response.body} "
    end

    render :js => "window.location = '/intervention'"
  end

  def get_buildings_by_customer
    @buildings = Building.where("customer_id = ?", params[:customer_id])
    # binding.pry
    respond_to do |format|
      format.json { render :json => @buildings }
      # render :json => @buildings
    end
  end

  def intervention_new
    if params[:customer].present? && params[:customer].strip != ""
      @buildings = Building.where("customer_id = ?", params[:customer])
    else
      @buildings = Building.all
    end
  end

  def get_batteries_by_building
    @batteries = Battery.where("building_id = ?", params[:building_id])
    respond_to do |format|
      format.json { render :json => @batteries }
    end
  end

  def get_columns_by_battery
    @columns = Column.where("battery_id = ?", params[:battery_id])
    respond_to do |format|
      format.json { render :json => @columns }
    end
  end

  def get_elevators_by_column
    @elevators = Elevator.where("column_id = ?", params[:column_id])
    respond_to do |format|
      format.json { render :json => @elevators }
    end
  end
end
