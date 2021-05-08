function createTable(sessions) {

    let table = document.createElement("table")
    let headers = document.createElement("tr")
    let headers_content = "<th style='border: 1px solid black; border-collapse: collapse;'>Date</th> <th style='border: 1px solid black; border-collapse: collapse;'>Available Capacity</th> <th style='border: 1px solid black; border-collapse: collapse;'>Minimum Age Limit</th> <th style='border: 1px solid black; border-collapse: collapse;'>Vaccine Name</th> <th style='border: 1px solid black; border-collapse: collapse;'>Slots</th>"

    headers.innerHTML = headers_content

    table.appendChild(headers)

    sessions.map((session) => {
        let tr = document.createElement("tr")

        let row = "<td style='border: 1px solid black; border-collapse: collapse;'>" + session.date + "</td><td style='border: 1px solid black; border-collapse: collapse;'>" + session.available_capacity + "</td><td style='border: 1px solid black; border-collapse: collapse;'>" + session.min_age_limit + "</td><td style='border: 1px solid black; border-collapse: collapse;'>" + session.vaccine + "</td><td style='border: 1px solid black; border-collapse: collapse;'>" + session.slots + "</td>"
        tr.innerHTML = row

        table.appendChild(tr)
        tr.style.cssText = 'border: 1px solid black; border-collapse: collapse;'

    })


    table.style.cssText = 'border: 1px solid black; border-collapse: collapse;width:100%'
    headers.style.cssText = 'border: 1px solid black; border-collapse: collapse;'
    return table;
}






function createDiv(center) {
    let div = document.createElement("div")
    let name = document.createElement("h2")
    let address = document.createElement("p")
    let address_content = "<B>Address: </B>" + center.address + ", " + center.block_name + ", " + center.district_name + ", " + center.state_name + "- " + center.pincode
    let fee = document.createElement("p")
    let fee_content = "<B>Price: </B>" + center.fee_type
    let timings = document.createElement("p")
    let timings_content = "<b>Timings: </b>" + center.from + " to " + center.to


    name.innerHTML = center.name
    address.innerHTML = address_content
    fee.innerHTML = fee_content
    timings.innerHTML = timings_content

    div.appendChild(name)
    div.appendChild(address)
    div.appendChild(fee)
    div.appendChild(timings)
    div.appendChild(createTable(center.sessions))

    return div
}


async function run() {
    let pin = document.getElementById("pin").value
    let date = document.getElementById("date").value
    let date_elements = date.split("-")
    let day = date_elements[2]
    let mon = date_elements[1]
    let year = date_elements[0]
    let final_date = day + "-" + mon + "-" + year
    let fdate = date ? final_date : ""
    let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=" + fdate;

    let response = await fetch(url)
    let result = await response.json()

    const res = document.getElementById("results")
    while (res.firstChild) res.removeChild(res.firstChild)
    

    if (result.error) { alert('Please enter the correct parameters') }
    else if (result.centers.length == 0) { alert('No centers available') }
    else {
        result.centers.map((center) => {
            let div = createDiv(center);
            res.appendChild(div)
            res.appendChild(document.createElement("hr"))
        })
    }

}